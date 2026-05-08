import { fileURLToPath, pathToFileURL } from "url";
import path from "path";
import { readdir } from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetDir = path.resolve(__dirname, "../dist/client/assets");
const serverAssetDir = path.resolve(__dirname, "../dist/server/assets");
let assetManifestPromise;
let startManifestPromise;

export const config = {
  runtime: "nodejs",
  maxDuration: 10,
};

async function getAssetManifest() {
  if (!assetManifestPromise) {
    assetManifestPromise = readdir(assetDir, { withFileTypes: true }).then((entries) => {
      const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);
      const cssFiles = files.filter((fileName) => fileName.endsWith(".css")).sort();

      return {
        cssFiles,
        entryScript: null,
      };
    });
  }

  return assetManifestPromise;
}

async function getStartManifest() {
  if (!startManifestPromise) {
    startManifestPromise = readdir(serverAssetDir, { withFileTypes: true }).then(async (entries) => {
      const manifestFile = entries
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name)
        .find((fileName) => fileName.startsWith("_tanstack-start-manifest") && fileName.endsWith(".js"));

      if (!manifestFile) {
        return null;
      }

      const manifestModule = await import(pathToFileURL(path.resolve(serverAssetDir, manifestFile)).href);
      return manifestModule.tsrStartManifest?.() ?? null;
    });
  }

  return startManifestPromise;
}

function buildHtml({ cssFiles, entryScript, preloads = [] }) {
  const styles = cssFiles.map((fileName) => `    <link rel="stylesheet" href="/assets/${fileName}" />`).join("\n");
  const preloadLinks = preloads
    .filter((href) => typeof href === "string" && href.length > 0)
    .map((href) => `    <link rel="modulepreload" href="${href}" />`)
    .join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>Dagim Tadesse</title>
${styles}
  ${preloadLinks}
    <style>
      html, body {
        margin: 0;
        min-height: 100%;
        background: #f6f4ef;
      }
      #boot-screen {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f6f4ef;
        color: #111827;
        font-family: Arial, Helvetica, sans-serif;
      }
      #boot-screen .panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        padding: 24px 28px;
        text-align: center;
      }
      #boot-screen .spinner {
        width: 48px;
        height: 48px;
        border-radius: 9999px;
        border: 2px solid rgba(16, 185, 129, 0.2);
        border-top-color: #10b981;
        animation: boot-spin 0.9s linear infinite;
      }
      #boot-screen .title {
        margin: 0;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: -0.02em;
      }
      #boot-screen .subtitle {
        margin: 4px 0 0;
        font-size: 14px;
        color: #4b5563;
      }
      @keyframes boot-spin {
        to { transform: rotate(360deg); }
      }
    </style>
    <script>
      window.__TSS_START_OPTIONS__ = { serializationAdapters: [] };
      window.$_TSR = {
        initialized: false,
        buffer: [],
        h: () => {},
        router: {
          matches: [],
          lastMatchId: "",
          manifest: {},
          dehydratedData: {}
        }
      };
    </script>
  </head>
  <body>
    <div id="boot-screen">
      <div class="panel">
        <div class="spinner"></div>
        <div>
          <p class="title">Loading Dagim Tadesse</p>
          <p class="subtitle">Preparing the portfolio experience...</p>
        </div>
      </div>
    </div>
    <script type="module" src="/assets/${entryScript}"></script>
  </body>
</html>`;
}

export default async function handler() {
  try {
    const [{ cssFiles }, startManifest] = await Promise.all([getAssetManifest(), getStartManifest()]);
    const entryScript = startManifest?.clientEntry ?? "/assets/index-D0--MzwB.js";
    const preloads = [
      ...(startManifest?.routes?.__root__?.preloads ?? []),
      ...(startManifest?.routes?.["/"]?.preloads ?? []),
    ];

    return new Response(buildHtml({ cssFiles, entryScript, preloads }), {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      "<!doctype html><html><head><meta charset=\"utf-8\"><title>Service Error</title></head><body><h1>Server Error</h1></body></html>",
      {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      },
    );
  }
}
