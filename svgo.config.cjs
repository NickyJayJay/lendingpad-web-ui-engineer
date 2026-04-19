// Normalize the source SVGs before they are compiled into the icon font.
// Stripping fill/stroke means each glyph inherits the current text color.

module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    { name: 'removeAttrs', params: { attrs: '(fill|stroke)' } },
  ],
};
