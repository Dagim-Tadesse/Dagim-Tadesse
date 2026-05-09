# Deployment Documentation

## Problem Summary
The application kept failing with "Fatal error during initialization" on Vercel while the dev server worked fine locally. The build would complete successfully but then get stuck at "Deploying outputs" phase.

## Root Causes Identified

### 1. **Incorrect Server Entry Point** (FIXED)
- **Issue**: vite.config.ts had `server: { entry: "server" }` instead of `"src/server.ts"`
- **Impact**: TanStack Start couldn't locate the server file during build
- **Fix**: Updated to `server: { entry: "src/server.ts" }`

### 2. **Tailwind CSS Configuration Issues** (FIXED)
- **Issue**: Had problematic `@source "../src"` directive and circular CSS variable references
- **Impact**: CSS processing would fail during initialization causing fatal errors
- **Fixes**:
  - Removed the `@source` directive (Tailwind v4 auto-discovers sources)
  - Moved CSS color variables into `@theme inline` block with direct oklch values
  - Simplified `:root` selector to only contain gradient and shadow utilities

### 3. **Nitro Preset Not Applicable** (FIXED)
- **Issue**: Build script used `NITRO_PRESET=vercel` environment variable
- **Problem**: TanStack Start uses Vite, not Nitro. This caused incorrect build output structure
- **Fix**: Removed the Nitro preset from build command

### 4. **Incomplete Vercel Output Structure** (PARTIALLY FIXED)
- **Issue**: Build was creating `dist/client` and `dist/server` but Vercel expects `.vercel/output` with specific structure
- **Solution**: Created `scripts/build-vercel.js` post-build script that:
  - Copies `dist/client` → `.vercel/output/static/` (static assets)
  - Copies `dist/server` → `.vercel/output/functions/index/server/` (server code)
  - Copies `node_modules` → `.vercel/output/functions/index/node_modules/` (dependencies)
  - Creates wrapper `index.js` to expose server handler

### 5. **Current Issue: Deployment Stuck at "Deploying outputs"** (NEEDS INVESTIGATION)
- **Symptoms**: 
  - Build completes in 44s: ✓
  - postbuild script succeeds: ✓
  - But then deployment hangs at "Deploying outputs..." without completion
- **Likely Causes**:
  - node_modules copying is too slow (944 packages with 8GB memory limit)
  - Vercel is timing out while uploading the function bundle (likely > 250MB)
  - Circular dependencies or missing exports in the serverless wrapper
  - The @lovable.dev/vite-tanstack-config might be incompatible with Vercel's serverless structure

## Build Process Steps

### Step 1: Vite Builds Client Bundle
```
vite v7.3.3 building client environment for production...
✓ 2299 modules transformed
✓ built in 5.05s
- Output: dist/client/assets/ (CSS 80KB, JS 155KB, 349KB)
```

### Step 2: Vite Builds Server Bundle
```
vite v7.3.3 building ssr environment for production...
✓ 50 modules transformed
✓ built in 569ms
- Output: dist/server/server.js (48KB) + asset files
```

### Step 3: Post-Build Script (build-vercel.js)
```
Copies files to .vercel/output/
✓ Copied client files to static
✓ Copied server directory to functions/index/server
✓ Copied node_modules to functions/index (SLOW - 13 seconds)
✓ Created serverless function index.js wrapper
✓ Created function configuration (.vc-config.json)
✓ Created Vercel configuration
```

### Step 4: Vercel Deployment (HANGS HERE)
```
Build Completed in /vercel/output [44s]
Deploying outputs...
<-- STUCK: Never completes
```

## Current Wrapper Code

The serverless function wrapper at `.vercel/output/functions/index/index.js`:
```javascript
import serverModule from './server/server.js';

const handler = serverModule.default || serverModule;

if (!handler) {
  throw new Error('Server module does not export default handler');
}

export default handler;
```

**Problem**: This wrapper might not be correctly importing the server module because the relative path doesn't account for Vercel's function structure.

## Development Server Status

✓ **Working Correctly**:
- Dev server starts on port 8081
- All pages render without timeout
- No initialization errors
- Hot Module Replacement working

✓ **Pages Confirmed Working**:
- Home/Hero section
- About section
- Projects showcase (PriceGuard-AI, SpendWise, Spark Study, Cardano)
- Skills grid
- Experience timeline
- Education
- Contact section

## Recommendations

### Immediate Fixes Needed:
1. **Eliminate node_modules Copying**: Node modules shouldn't be copied to Vercel functions - they should be installed fresh during build
2. **Use Vercel Presets**: Check if @lovable.dev/vite-tanstack-config has a specific Vercel adapter/preset
3. **Simplify Serverless Structure**: Don't copy entire server directory - only the compiled server.js
4. **Fix Import Paths**: The wrapper's relative imports might not work in Vercel's sandboxed environment

### Alternative Approach:
Consider using Vercel's native Next.js instead of TanStack Start, as it has better Vercel integration and fewer deployment issues.

## Testing Checklist

When fixing:
- [ ] Dev server starts without timeout (npm run dev)
- [ ] Dev server responds to HTTP requests instantly
- [ ] Build completes in < 60 seconds
- [ ] .vercel/output directory is created correctly
- [ ] Vercel deployment shows "Build Completed" ✓
- [ ] Vercel shows "Deploying outputs..." and completes (not stuck)
- [ ] Live Vercel URL responds with 200 status code
- [ ] All pages load and render without timeout
- [ ] No 404 errors on routes
- [ ] No "Fatal error during initialization" message

## Files Modified

1. `vite.config.ts` - Fixed server entry point
2. `src/styles.css` - Fixed Tailwind CSS configuration
3. `package.json` - Removed NITRO_PRESET, added postbuild script
4. `scripts/build-vercel.js` - Created post-build configuration script
5. `vercel.json` - Created Vercel deployment config
