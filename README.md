#h5-generator
做一个简单的营销h5配置工具，包含滑屏翻页和长页面，定制化页面跳转逻辑
[![NODE](https://img.shields.io/badge/NODE-%5E8.7.0-green.svg)](https://nodejs.org)
[![MONGODB](https://img.shields.io/badge/MONGODB-%5E3.4.6-yellowgreen.svg)](https://www.mongodb.com/)

##使用指南

###安装

进入代码目录执行

```bash

$ npm install

```

###启动mongodb

- 开发环境

```bash

$ sudo mongod --dbpath /${YOUR_DB_PATH} --auth

```

###启动服务


```bash

$ npm start

```

### `Controller` 声明方式

- 函数

```js

exports.api = (req, res) => {
  res.send('API');
};

```

- 对象

属性|类型|是否必须|默认|备注
------------|----------|----------|---------|-------
method      | String   |    No    |  `GET`  | 枚举值 ['GET', 'POST']
params      | Array    |    No    |  `[]`   |
middlewares | Array    |    No    |  `[]`   |
handler     | Function |    Yes   |   --    |


```js

exports.api = {
  method: 'GET',
  params: [':id'],
  middlewares: [
    function (req, res, next) {
      console.log('Middleware');
      next();
    },
  ],
  handler(req, res) {
    res.send('API');
  }
};

```
