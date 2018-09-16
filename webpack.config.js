const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, { mode }) => {
  return {
    entry: {
      bundle: path.join(__dirname, 'src/main.js')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            'babel-loader',
            'eslint-loader'
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([ path.join(__dirname, 'dist') ]),
      new HtmlWebpackPlugin({ template: path.join(__dirname, 'src/index.html') })
    ],
    mode: mode || 'production',
    devtool: mode === 'development' ? 'eval-source-map' : false
  }
}
