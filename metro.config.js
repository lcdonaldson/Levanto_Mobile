const { getDefaultConfig } = require('expo/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Enable symlink support for workspace packages
config.watchFolders = [monorepoRoot];
config.resolver.unstable_enableSymlinks = true;

// Force Metro to use CommonJS builds instead of ESM (fixes import.meta errors)
config.resolver.unstable_conditionNames = ['browser', 'require', 'react-native'];

// Let Metro know where to resolve packages from
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Explicitly exclude .mjs files to prevent import.meta errors on web
// Ensure ts/tsx are included (required for React Navigation)
const defaultSourceExts = ['js', 'jsx', 'json', 'ts', 'tsx'];
config.resolver.sourceExts = [
  ...defaultSourceExts,
  ...config.resolver.sourceExts.filter(
    (ext) => ext !== 'mjs' && !defaultSourceExts.includes(ext)
  )
];

// Create a custom resolver that handles both symlinks and App.tsx redirect
const symlinkResolver = MetroSymlinksResolver();
const customResolver = (context, moduleName, platform) => {
  // Fix: expo/AppEntry.js is hoisted to the monorepo root node_modules and
  // does `import App from '../../App'` which resolves to the monorepo root
  // instead of this app directory. Redirect it to the correct App.tsx.
  if (
    moduleName === '../../App' &&
    context.originModulePath.includes(path.join('node_modules', 'expo', 'AppEntry'))
  ) {
    return {
      filePath: path.resolve(projectRoot, 'App.tsx'),
      type: 'sourceFile',
    };
  }
  // Otherwise use the symlink resolver for monorepo packages
  return symlinkResolver(context, moduleName, platform);
};

config.resolver.resolveRequest = customResolver;

module.exports = config;
