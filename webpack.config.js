import { resolve } from 'path';
import HtmlPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin, {
  loader as _loader
} from 'mini-css-extract-plugin';
import path from 'path';
const __dirname = path.resolve();

export const entry = './src/main.js';
export const output = {
  path: resolve(__dirname, 'dist'),
  filename: 'js/bundle.js',
  clean: true
};
export const module = {
  rules: [
    {
      test: /\.(png|jpg|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'assets/images/[name][ext]'
      }
    },
    {
      test: /\.s[ac]ss$/i,
      use: [_loader, 'css-loader', 'sass-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.m?js$/,
      include: [resolve(__dirname, 'src')],
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: 3
              }
            ]
          ],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    }
  ]
};
export const devtool = 'inline-source-map';
export const devServer = {
  client: {
    logging: 'none'
  }
};
export const plugins = [
  new HtmlPlugin({
    template: './public/index.html',
    favicon: resolve(__dirname, 'public/favicon.ico')
  }),
  new CopyPlugin({
    patterns: [{ from: 'public/favicon.ico' }]
  }),
  new MiniCssExtractPlugin({
    filename: 'assets/css/style.[contenthash].css'
  })
];
