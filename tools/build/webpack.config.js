const path = require('path'),
    webpack = require('webpack'),
    argv = require('yargs').argv,
    name = argv.name,
    fs = require('fs'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer');

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
module.exports = {
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
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    'scss': ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: false,
                                    minimize: true //css压缩
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: false
                                }
                            }
                        ]
                    })
                },
                postcss: [autoprefixer({ browsers: ['iOS >= 5','Android >= 4.0', 'Firefox >= 20', 'Chrome >= 20'] })],
                cssSourceMap: false
            }
          },
          {
            test: /\.js$/,
            loader: 'babel-loader!source-map-loader',
            exclude: /node_modules/
          },
          {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          }
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
}
