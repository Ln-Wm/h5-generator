// 用户表
const mongoose=require('mongoose');
const DBC=require('../../db/DB');
//User Schema
const activitySchema = new mongoose.Schema({
    actId: Number,  //activityId
});
const activityModel = DBC.model('activity', activitySchema);

module.exports=activityModel;
