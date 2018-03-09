const express = require('express'),
    app = express.Router();

var fileUpload = require('./fileUpload');
app.post('/fileUpload',fileUpload.upload,fileUpload.callback);

module.exports=app;
