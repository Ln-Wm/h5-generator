const ora = require('ora');
const chalk = require('chalk');
const Webpack = require('webpack');
const argv = require('yargs').argv;
const WebpackDevServer = require('webpack-dev-server');

let spinner = ora('正在进行打包...');
spinner.start();
const name = argv.name;
if(!name || typeof name!='string'){
    console.log(chalk.cyan('请填写目录\n'))
    return;
}
const webpackConfig = require('./webpack.dev.config');
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    stats: {
        colors: true
    }
});
WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);
const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, devServerOptions);
server.listen('3000','localhost',() => {
    spinner.stop();
    console.log(chalk.yellow('  正在监听~\n'));
});
