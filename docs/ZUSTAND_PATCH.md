# Zustand Patch Solution

This document explains why we need to patch Zustand and how the patch works.

## The Problem

When running the app on React Native Web, Zustand's devtools middleware causes this error:

```
Uncaught SyntaxError: Cannot use 'import.meta' outside a module
```

### Root Cause

Zustand's source code (`node_modules/zustand/esm/middleware.mjs`) contains this code:

```javascript
const env = import.meta.env
  ? import.meta.env.MODE
  : undefined;
```

This uses `import.meta.env`, which is Vite-specific syntax. Metro bundler (used by React Native and Expo) doesn't support `import.meta` syntax, even on web builds.

### Why This Happens

1. Zustand is built to work in multiple environments (Vite, Webpack, React Native)
2. The library uses `import.meta.env` to detect Vite's development mode
3. Metro doesn't transform or polyfill `import.meta`, causing a runtime error
4. The error only appears on web because that's where the devtools middleware code path is executed

## The Solution

We use a postinstall script that automatically patches the Zustand source file after every `npm install`.

### The Patch Script

**File:** `scripts/patch-zustand.js`

```javascript
const fs = require('fs');
const path = require('path');

// Path to the problematic file at monorepo root
const filePath = path.resolve(
  __dirname,
  '../../node_modules/zustand/esm/middleware.mjs'
);

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace import.meta.env checks with __DEV__
  content = content.replace(
    /import\.meta\.env\s*\?\s*import\.meta\.env\.MODE\s*:\s*undefined/g,
    '__DEV__ ? "development" : "production"'
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Patched zustand/esm/middleware.mjs');
} else {
  console.warn('⚠️  Could not find zustand/esm/middleware.mjs to patch');
}
```

### How It Works

1. **Postinstall Hook:** The script runs automatically after `npm install` via the `postinstall` script in `package.json`:
   ```json
   {
     "scripts": {
       "postinstall": "node scripts/patch-zustand.js"
     }
   }
   ```

2. **File Location:** Patches the file in the monorepo root's `node_modules` (where npm workspaces hoists dependencies)

3. **Replacement:** Changes this:
   ```javascript
   const env = import.meta.env ? import.meta.env.MODE : undefined;
   ```
   
   To this:
   ```javascript
   const env = __DEV__ ? "development" : "production";
   ```

4. **Why `__DEV__`:** It's a global constant that Metro provides, available on all platforms (iOS, Android, Web)

## Alternative Solutions Considered

### 1. Use a Different State Management Library
- ❌ Zustand is lightweight and perfect for our needs
- ❌ Would require rewriting all state management code

### 2. Use `patch-package`
- ✅ Would work, but adds another dependency
- ❌ Requires committing patch files to the repo
- ✅ Our custom script is simpler for this single-file patch

### 3. Fork Zustand
- ❌ Overkill for a one-line change
- ❌ Would need to maintain the fork and merge updates

### 4. Don't Use Persistence/Devtools
- ❌ We need persistence for auth state
- ❌ The error occurs even if we don't explicitly enable devtools

### 5. Configure Metro to Transform `.mjs` Files
- ❌ Doesn't work - Metro can't polyfill `import.meta`
- ❌ We tried filtering `.mjs` from sourceExts, but that breaks other things

## Verification

To verify the patch is working:

1. **Check the file is patched:**
   ```bash
   grep -n "__DEV__" ../../node_modules/zustand/esm/middleware.mjs
   ```
   Should show the patched line.

2. **Run on web:**
   ```bash
   npx expo start --web
   ```
   Should load without `import.meta` errors.

3. **Test after fresh install:**
   ```bash
   rm -rf ../../node_modules
   npm install  # at monorepo root
   # Should see "✅ Patched zustand/esm/middleware.mjs"
   ```

## Maintenance

### When Zustand Updates

The patch script uses a regex that should work across Zustand versions, but if Zustand changes this code significantly:

1. Check the error message to see what changed
2. Update the regex in `scripts/patch-zustand.js`
3. Test on all platforms (iOS, Android, Web)

### Future: Upstream Fix

We should monitor these Zustand issues:
- [Zustand #2000](https://github.com/pmndrs/zustand/issues/2000) - Metro bundler support
- Consider opening a PR to Zustand to use `__DEV__` instead of `import.meta.env`

The ideal solution would be for Zustand to detect the React Native environment and avoid `import.meta` entirely.

## Related Issues

- Metro doesn't support `import.meta`: https://github.com/facebook/metro/issues/670
- Vite-specific code causing issues in Metro: https://github.com/vitejs/vite/discussions/7405
- Similar issues with other packages that assume Vite

## Summary

- **Problem:** Zustand uses `import.meta.env` which Metro doesn't support
- **Solution:** Postinstall script that patches the source to use `__DEV__`
- **Location:** `scripts/patch-zustand.js` + `package.json` postinstall hook
- **Result:** Zustand works perfectly on iOS, Android, and Web
