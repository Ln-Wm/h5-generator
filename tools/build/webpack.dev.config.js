const path = require('path'),
    webpack = require('webpack'),
    argv = require('yargs').argv,
    name = argv.name,
    fs = require('fs'),
    autoprefixer = require('autoprefixer'),
    FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const filePath=path.resolve(__dirname, '../../dev/src/'+name)+'/',
    files =  fs.readdirSync(filePath);
let entry={};
files.forEach(function(file){
    //过滤svn文件夹和js文件
    if(file.match(/\.js$/)){
        const key=file.split(/\.js$/)[0];
        entry[key]=filePath+file;
    }
});
const createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
module.exports={
    entry: entry,
    output: {
        path: path.resolve(__dirname, '../../public/dist/'+name),
        filename: '[name].min.js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': path.resolve(__dirname, '../../dev'),
            '@comp': path.resolve(__dirname, '../../dev/src/common'),
        }
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: 'vue-style-loader!css-loader!sass-loader'
                },
                postcss: [autoprefixer({ browsers: ['iOS >= 5','Android >= 4.0', 'Firefox >= 20', 'Chrome >= 20'] })],
                cssSourceMap: true
            }
          },
          {
            test: /\.js$/,
            loader: 'babel-loader!source-map-loader',
            exclude: /node_modules/
          },
          {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[ext]?[hash]'
            }
          }
        ]
    },
    devServer: {
        clientLogLevel: 'warning',
        hot: true,
        compress: true,
        host: 'localhost',
        port: '3000',
        open: true,
        inline:true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        overlay: { warnings: false, errors: true },
        publicPath: `/dist/${name}/`,
        proxy: {
            "/": "http://localhost:8000",
        },
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: false,
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running`],
          },
          onErrors: createNotifierCallback()
        })
    ]
}
