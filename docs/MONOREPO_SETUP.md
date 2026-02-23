# Monorepo Setup Guide

This document explains how the Levanto mobile app is configured to work within an npm workspaces monorepo, including all the solutions we implemented to handle Metro bundler's symlink resolution issues.

## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Key Challenges & Solutions](#key-challenges--solutions)
- [Metro Configuration](#metro-configuration)
- [Troubleshooting](#troubleshooting)

## Overview

This React Native app (built with Expo SDK 54) lives in a monorepo managed by npm workspaces. The monorepo allows us to share packages between the mobile app, web app, and backend services.

**Why monorepo?**
- Share design system, API clients, types, and utilities across projects
- Single source of truth for dependencies
- Easier cross-project refactoring

**The challenge:**
Metro bundler has historically had issues with symlinked packages (which npm workspaces uses). We had to implement several solutions to make it work.

## Project Structure

```
levanto-mobile/                    # Monorepo root
├── package.json                   # Root workspace config
├── node_modules/                  # Hoisted dependencies (symlinks here)
│   ├── @levanto/
│   │   ├── design-system → ../../packages/design-system
│   │   └── api → ../../packages/api
│   └── zustand/
│   └── @react-navigation/
├── apps/
│   └── mobile/                    # This React Native app
│       ├── package.json
│       ├── metro.config.js        # Custom Metro config
│       ├── App.tsx
│       └── src/
└── packages/
    ├── design-system/             # Shared UI components
    ├── api/                       # API client
    ├── types/                     # Shared TypeScript types
    └── utils/                     # Shared utilities
```

## Key Challenges & Solutions

### 1. Symlinked Package Resolution

**Problem:** Metro bundler couldn't resolve imports from symlinked workspace packages like `@react-navigation/native`.

**Solution:** Use Microsoft's `@rnx-kit/metro-resolver-symlinks` package, which was specifically built to solve React Native monorepo symlink issues.

```bash
npm install --save-dev @rnx-kit/metro-resolver-symlinks
```

### 2. Design System Integration

**Problem:** Even with symlink support enabled, internal imports within the design system package would fail.

**Solution:** Copied the design system source directly into the app:
```
apps/mobile/src/design-system/  (copied from packages/design-system/src/)
```

This is a temporary workaround until the design system is published as a proper npm package. Once published, we can remove the local copy and use the symlinked version.

**Trade-off:** We lose the monorepo benefit for the design system, but it's a pragmatic solution that works reliably on all platforms.

### 3. Zustand `import.meta.env` Error on Web

**Problem:** Zustand's devtools middleware uses `import.meta.env` (Vite syntax) which Metro doesn't support, causing crashes on web.

**Solution:** Created a postinstall patch script that replaces `import.meta.env` with `__DEV__` in the Zustand source.

See: `scripts/patch-zustand.js` and `docs/ZUSTAND_PATCH.md`

### 4. Expo AppEntry.js Resolution

**Problem:** Expo's `AppEntry.js` is hoisted to the monorepo root and does `import App from '../../App'`, which resolves to the wrong location.

**Solution:** Custom resolver in `metro.config.js` that intercepts this specific import and redirects it to the correct `App.tsx`.

## Metro Configuration

Our `metro.config.js` combines multiple solutions:

```javascript
const { getDefaultConfig } = require('expo/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch the entire monorepo
config.watchFolders = [monorepoRoot];

// 2. Enable symlink support
config.resolver.unstable_enableSymlinks = true;

// 3. Force CommonJS builds (fixes import.meta errors)
config.resolver.unstable_conditionNames = ['browser', 'require', 'react-native'];

// 4. Tell Metro where to find packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// 5. Exclude .mjs files (prevents import.meta errors)
const defaultSourceExts = ['js', 'jsx', 'json', 'ts', 'tsx'];
config.resolver.sourceExts = [
  ...defaultSourceExts,
  ...config.resolver.sourceExts.filter(
    (ext) => ext !== 'mjs' && !defaultSourceExts.includes(ext)
  )
];

// 6. Custom resolver for symlinks + App.tsx redirect
const symlinkResolver = MetroSymlinksResolver();
const customResolver = (context, moduleName, platform) => {
  // Fix Expo AppEntry.js
  if (
    moduleName === '../../App' &&
    context.originModulePath.includes(path.join('node_modules', 'expo', 'AppEntry'))
  ) {
    return {
      filePath: path.resolve(projectRoot, 'App.tsx'),
      type: 'sourceFile',
    };
  }
  // Use symlink resolver for everything else
  return symlinkResolver(context, moduleName, platform);
};

config.resolver.resolveRequest = customResolver;

module.exports = config;
```

### What Each Part Does

1. **watchFolders**: Tells Metro to watch the entire monorepo for file changes
2. **unstable_enableSymlinks**: Enables Metro's experimental symlink support (available since React Native 0.72)
3. **unstable_conditionNames**: Forces Metro to prefer CommonJS builds over ESM (prevents `import.meta` errors)
4. **nodeModulesPaths**: Tells Metro to look in both local and monorepo root node_modules
5. **sourceExts**: Excludes `.mjs` files which often contain `import.meta` syntax
6. **customResolver**: Combines `@rnx-kit/metro-resolver-symlinks` with our Expo AppEntry fix

## Troubleshooting

### "Module does not exist in the Haste module map"

This usually means Metro can't resolve a symlinked package.

**Fix:**
1. Make sure `@rnx-kit/metro-resolver-symlinks` is installed
2. Verify `unstable_enableSymlinks: true` is set
3. Clear Metro cache: `npx expo start --clear`
4. If still broken, consider copying the package source locally (like we did with design-system)

### "Cannot use 'import.meta' outside a module"

This means a package is using ESM syntax that Metro doesn't support.

**Fix:**
1. Add the package's `.mjs` files to the sourceExts exclusion list
2. Force CommonJS with `unstable_conditionNames: ['browser', 'require', 'react-native']`
3. If it's Zustand, make sure the postinstall patch is running
4. For other packages, you may need to create a similar patch script

### White screen on iOS/Android

**Debug steps:**
1. Check Metro bundler output for errors
2. Enable remote debugging and check browser console
3. Try clearing Metro cache: `npx expo start --clear`
4. Try rebuilding: `npx expo run:ios --clear` or `npx expo run:android --clear`
5. Check that `react-native-gesture-handler` is imported at the top of `App.tsx`

### Web works but native doesn't (or vice versa)

This usually indicates a platform-specific issue with package resolution or native dependencies.

**Fix:**
1. Check if the failing platform has the dependency installed
2. For native-only issues, run `npx expo prebuild --clean` and rebuild
3. For web-only issues, check browser console for errors
4. Ensure `Platform.OS` checks are correct in conditional code

## Testing the Setup

To verify everything is working:

1. **Install dependencies:**
   ```bash
   cd /path/to/levanto-mobile
   npm install
   ```

2. **Start Metro:**
   ```bash
   cd apps/mobile
   npx expo start --clear
   ```

3. **Test on each platform:**
   - iOS: Press `i` or run `npx expo start --ios`
   - Android: Press `a` or run `npx expo start --android`
   - Web: Press `w` or run `npx expo start --web`

4. **Verify features:**
   - Login flow works
   - Navigation between screens works
   - Logout works
   - State persists after reload

## References

- [Metro Bundler Configuration](https://facebook.github.io/metro/docs/configuration)
- [Expo Monorepo Guide](https://docs.expo.dev/guides/monorepos/)
- [@rnx-kit Documentation](https://microsoft.github.io/rnx-kit/)
- [Metro Symlinks Support](https://microsoft.github.io/rnx-kit/docs/tools/metro-resolver-symlinks)
- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
