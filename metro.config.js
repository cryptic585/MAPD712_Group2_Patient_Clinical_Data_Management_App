const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

/*module.exports = {
    resolver: {
      sourceExts: ['jsx', 'js', 'ts', 'tsx'], // Add any other extensions you use
    },
    transformer: {
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
    serializer: {
      getModulesRunBeforeMainModule: () => [
        require.resolve('react-native/Libraries/Core/Devtools/setupDevtools'),
      ],
    },
    symbolicator: {
      customizeFrame: () => {
        const codeFrame = require('metro-symbolicator/src/CodeFrame');
        codeFrame.addHook(codeFrame.hooks.hermesFrame);
      },
    },
  };*/
  
