const express = require('express');

const app = express();
const config = require('./webpack.config.js');
const webpack = require('webpack');

// Object.keys(config.entry).forEach(function (name) {
//   config.entry[name] = ['./dev-client'].concat(config.entry[name])
// })
console.log(JSON.stringify(config))
const compiler = webpack(config);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});

var hotMiddleware = require('webpack-hot-middleware')(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

app.use(devMiddleware);
app.use(hotMiddleware);

app.listen(9001, function () {
	console.log('Example app listening on port 9001!\n');
});

// const webpackDevServer = require('webpack-dev-server');
// const webpack = require('webpack');

// const config = require('./webpack.config.js');
// const options = {
//   contentBase: './dist',
//   hot: true,
//   host: 'localhost'
// };

// webpackDevServer.addDevServerEntrypoints(config, options);
// const compiler = webpack(config);
// const server = new webpackDevServer(compiler, options);

// server.listen(5000, 'localhost', () => {
//   console.log('dev server listening on port 5000');
// });