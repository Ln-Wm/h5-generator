// 入口文件
// author:suning
'use strict';
const express = require('express'),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser');
// Config File
const config=require('../app/config/config');
const app = express();
// 禁用报头
app.disable('x-powered-by');
// view engine setup
app.set('views', path.join(__dirname, '../app/modules/views'));
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('view engine', 'html');
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({
    limit:'10mb',
    extended:false
}));
// 静态资源目录
app.use(express.static(path.join(__dirname, '../public')));
// 路由控制
const libRouter = require('../app/lib/router');
app.use(libRouter);
const router = require('../app/config/router');
app.use(router);

/// catch 404 and forwarding to error handler
app.use((req, res, next)=> {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/// error handlers
app.use((err, req, res ,next)=> {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
