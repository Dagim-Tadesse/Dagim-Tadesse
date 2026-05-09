import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const writeFile = promisify(fs.writeFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

async function copyDirRecursive(src, dest) {
  await mkdir(dest, { recursive: true });
  const files = await readdir(src);
  
  for (const file of files) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const fileStat = await stat(srcFile);
    
    if (fileStat.isDirectory()) {
      await copyDirRecursive(srcFile, destFile);
    } else {
      await copyFile(srcFile, destFile);
    }
  }
}

async function buildForVercel() {
  const outputDir = path.join(rootDir, '.vercel', 'output');
  const staticDir = path.join(outputDir, 'static');
  const functionsDir = path.join(outputDir, 'functions', 'index');

  // Create directories
  await mkdir(staticDir, { recursive: true });
  await mkdir(functionsDir, { recursive: true });

  // Copy static client files
  const clientDir = path.join(rootDir, 'dist', 'client');
  if (fs.existsSync(clientDir)) {
    await copyDirRecursive(clientDir, staticDir);
    console.log('✓ Copied client files to .vercel/output/static');
  }

  // Copy server as serverless function
  const serverFile = path.join(rootDir, 'dist', 'server', 'server.js');
  if (fs.existsSync(serverFile)) {
    await copyFile(serverFile, path.join(functionsDir, 'index.js'));
    console.log('✓ Copied server to .vercel/output/functions/index');
  }

  // Create function config
  const config = {
    runtime: 'nodejs20.x',
    memory: 1024,
    maxDuration: 60,
  };
  
  await writeFile(
    path.join(functionsDir, '.vc-config.json'),
    JSON.stringify(config, null, 2)
  );
  console.log('✓ Created function configuration');

  // Create vercel.json config for routing
  const vercelConfig = {
    version: 2,
    builds: [
      {
        src: 'package.json',
        use: '@vercel/node',
      },
    ],
    routes: [
      {
        src: '^/api/(.*)',
        dest: '/api/$1',
      },
      {
        src: '^/(.*)',
        dest: '/index.html',
        status: 200,
      },
    ],
  };

  await writeFile(
    path.join(outputDir, 'config.json'),
    JSON.stringify(vercelConfig, null, 2)
  );
  console.log('✓ Created Vercel configuration');
}

buildForVercel().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
