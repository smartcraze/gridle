module.exports = function (api) {
  api.cache(true)
  const plugins = []

  plugins.push('react-native-reanimated/plugin')
  plugins.push([
    'module:react-native-dotenv',
    {
      moduleName: '@env',
      path: '.env.local',
      safe: false,
      allowUndefined: true,
    },
  ])

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins,
  }
}
