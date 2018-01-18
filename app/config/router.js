// author suning
// 路由页面
const express = require('express'),
    app = express.Router(),
    path = require('path'),
    fs = require('fs');
const mapping = require('./mapping');
const METHOD_ENUM = ['get', 'post'];

const filePath=path.resolve(__dirname, '../modules/controller/');
let files =  fs.readdirSync(filePath);

function middleware(middlewares, path){
    if (middlewares.length) {
        for (const fn of middlewares) {
            if (typeof fn !== 'function'){
                throw new Error(`中间件 ${path} - ${JSON.stringify(fn)} 不正确.`);
            }
        }
    }

    return (req, res, next) => {
        (function iterate(i, max) {
            if (i === max) return next();
            middlewares[i](req, res, iterate.bind(this, i + 1, max));
        })(0, middlewares.length);
    }
}

const excludeRules = mapping.excludeRules || [];
const rewriteRules = mapping.rewriteRules || new Map();
files.forEach((file)=>{
    //过滤svn文件夹和js文件
    if(file.match(/\Controller.js$/)){
        const controller=require(filePath+'/'+file);
        const methods = Object.keys(controller);
        const request=file.split(/\Controller.js$/)[0];

        methods.forEach((method) => {
            const operate = controller[method];

            let requestUrl = `/${request}/${method}`;
            let middlewares = [];
            let type = 'get';
            let handler;
            let params;
            switch (typeof operate) {
                case 'object':
                    params = operate.params || [];
                    type = (operate.method || 'get').toLowerCase();
                    middlewares = operate.middlewares || [];
                    if(params.length){
                        requestUrl += `/${params.join('/')}`;
                    }
                    handler = operate.handler;
                break;
                case 'function':
                    handler = operate;
                break;
                default: return;
            }
            if(excludeRules.indexOf(requestUrl) !== -1) {
                // Nothing to-do with the excluded rules
            }else if (METHOD_ENUM.indexOf(type) !== -1) {
                if (!handler) throw Error('[router]: no handler for method:', type);
                app[type](
                    rewriteRules.has(requestUrl)?rewriteRules.get(requestUrl):requestUrl,
                    middleware(middlewares, requestUrl),
                    handler
                );
            }else {
                throw Error('[router]: invalid method: ', method);
            }
        });
    }
});
module.exports=app;
