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
  const functionsDir = path.join(outputDir, 'functions', 'index.func');

  // Create directories
  await mkdir(staticDir, { recursive: true });
  await mkdir(functionsDir, { recursive: true });

  // Copy static client files
  const clientDir = path.join(rootDir, 'dist', 'client');
  if (fs.existsSync(clientDir)) {
    await copyDirRecursive(clientDir, staticDir);
    console.log('✓ Copied client files to .vercel/output/static');
  }

  // Bundle the server with esbuild to make it self-contained
  // This avoids the need to copy node_modules and fixes "Server initialization failed" errors
  console.log('ℹ Bundling server with esbuild...');
  const { execSync } = await import('child_process');
  try {
    execSync('npx esbuild dist/server/server.js --bundle --platform=node --format=esm --target=node20 --outfile=dist/server/server.bundle.js --banner:js="import { createRequire } from \'module\'; const require = createRequire(import.meta.url);" --external:fsevents --external:canvas --external:util --external:path --external:fs --external:url --external:http --external:https --external:zlib --external:stream --external:crypto', { stdio: 'inherit' });
    // Replace the original server.js with the bundled one
    fs.renameSync(path.join(rootDir, 'dist', 'server', 'server.bundle.js'), path.join(rootDir, 'dist', 'server', 'server.js'));
    console.log('✓ Server bundled successfully');
  } catch (error) {
    console.error('✗ Server bundling failed:', error);
    // Continue anyway, it might work if dependencies are somehow present
  }

  // Copy entire server directory to functions
  const serverDir = path.join(rootDir, 'dist', 'server');
  const functionsServerDir = path.join(functionsDir, 'server');
  if (fs.existsSync(serverDir)) {
    await copyDirRecursive(serverDir, functionsServerDir);
    console.log('✓ Copied server directory to .vercel/output/functions/index.func/server');
  }

  // DON'T copy node_modules - Vercel installs them automatically
  // Copying causes deployment to hang due to file count and size
  console.log('ℹ Skipping node_modules (Vercel installs automatically)');

  // Create a wrapper index.js that handles the server correctly
  // Use dynamic import with proper error handling for Vercel environment
  const indexWrapper = `let handler;

async function loadHandler() {
  try {
    const serverModule = await import('./server/server.js');
    handler = serverModule.default || serverModule;
    
    if (!handler || !handler.fetch) {
      throw new Error('Server module missing fetch handler');
    }
    
    console.log('[v0] Server module loaded successfully');
    return handler;
  } catch (error) {
    console.error('[v0] Failed to load server module:', error);
    throw error;
  }
}

// Preload handler
const handlerPromise = loadHandler();

export default async (req, res) => {
  try {
    const h = await handlerPromise;
    const response = await h.fetch(req);
    
    // Convert fetch Response to Node.js response
    for (const [key, value] of response.headers) {
      res.setHeader(key, value);
    }
    res.statusCode = response.status;
    res.end(await response.text());
  } catch (error) {
    console.error('[v0] Request handler error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(\`Server initialization failed: \${error.message}\\n\${error.stack}\`);
  }
};
`;

  await writeFile(path.join(functionsDir, 'index.js'), indexWrapper);
  console.log('✓ Created serverless function index.js');

  // Create function config
  const config = {
    runtime: 'nodejs20.x',
    handler: 'index.js',
    launcherType: 'Nodejs',
    memory: 1024,
    maxDuration: 60,
  };
  
  await writeFile(
    path.join(functionsDir, '.vc-config.json'),
    JSON.stringify(config, null, 2)
  );
  console.log('✓ Created function configuration');

  // Copy package.json to functions directory
  const packageJsonPath = path.join(rootDir, 'package.json');
  const functionsPackageJsonPath = path.join(functionsDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    // Clean up scripts for serverless environment
    delete packageJson.scripts;
    delete packageJson.devDependencies;
    
    await writeFile(
      functionsPackageJsonPath,
      JSON.stringify(packageJson, null, 2)
    );
    console.log('✓ Copied package.json to functions');
  }

  // Create vercel.json config for routing (Build Output API v3)
  const vercelConfig = {
    version: 3,
    routes: [
      {
        src: "^/assets/(.*)",
        headers: { "cache-control": "public, max-age=31536000, immutable" },
        continue: true
      },
      {
        handle: "filesystem"
      },
      {
        src: "/(.*)",
        dest: "/index"
      }
    ]
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
