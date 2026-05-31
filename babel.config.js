module.exports = function (api) {
  api.cache(true);
  return {
    // NativeWind v4: jsxImportSource を nativewind に切り替え、nativewind/babel を後段に。
    // reanimated/worklets と react-compiler の plugin は babel-preset-expo が
    // New Architecture / app.json の experiments を検出して自動挿入するため手書きしない（二重適用で壊れる）。
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
