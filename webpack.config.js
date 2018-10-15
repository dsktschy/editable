const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, { mode }) => {
  const dev = mode === 'development'
  return {
    entry: {
      bundle: path.join(__dirname, 'src/app.js')
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
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader', options: { sourceMap: dev } },
            { loader: 'css-loader', options: { sourceMap: dev } },
            { loader: 'postcss-loader', options: { sourceMap: dev } }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([ path.join(__dirname, 'dist') ]),
      new HtmlWebpackPlugin({ template: path.join(__dirname, 'src/index.html') })
    ],
    mode: mode || 'production',
    devtool: dev ? 'eval-source-map' : false
  }
}
