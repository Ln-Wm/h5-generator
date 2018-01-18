const ora = require('ora');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const argv = require('yargs').argv;

let spinner = ora('正在进行打包...');
spinner.start();
const name = argv.name;
if(!name || typeof name!='string'){
    console.log(chalk.cyan('请填写目录\n'))
    return;
}

webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.green('  打包成功啦~\n'));
})
