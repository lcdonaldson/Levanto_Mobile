module.exports = function (api) {
  api.cache(true);
  const plugins = [];
  // Reanimated plugin must be last and is not needed during Jest runs
  if (process.env.NODE_ENV !== 'test') {
    plugins.push('react-native-reanimated/plugin');
  }
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          unstable_transformImportMeta: true, // Transform import.meta for web compatibility
        },
      ],
    ],
    plugins,
  };
};
