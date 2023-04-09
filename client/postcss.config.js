module.exports = {
  plugins: [
    require('postcss-simple-vars'),
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('@lipemat/css-mqpacker'),
    require('cssnano')({
      preset: 'default'
    }),
  ]
};
