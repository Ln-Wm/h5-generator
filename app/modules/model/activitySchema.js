// 用户表
const mongoose=require('mongoose');
const DBC=require('../../db/DB');
//User Schema
const activitySchema = new mongoose.Schema({
    actId: Number,  //activityId
	title: String,  //标题
	keywords: String,  //标题
	description: String,  //标题
	shareImg: String,  //标题
    pages: [],  //页面列表
    pageIndex: Number,  //页面id计数器
    time: Number,  //创建时间
    status: Number, //状态 1正常 2删除
});
const activityModel = DBC.model('activity', activitySchema);

module.exports=activityModel;
