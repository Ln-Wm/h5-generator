// db Author suning
const mongoose = require('mongoose');
// Config File
const config=require('../config/config');

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO,{useMongoClient:true});

const DBC=mongoose.connection;
DBC.on('error',function(err) {
    console.error('connect to %s error',config.MONGO,err.message)
	DBC.close();
});
DBC.on('close',function() {
	mongoose.connect(config.MONGO);
});
DBC.once('open', function() {
    console.log('连接成功');
})


module.exports = DBC;
