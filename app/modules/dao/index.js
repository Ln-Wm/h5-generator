//index dao
const activityModel = require('../model/activitySchema');
const counter=require('../../lib/counter');
exports.list = (i=1)=>{
    return new Promise((resolve) => {
        let query={
            status:1
        }
        activityModel.find(query)
            .sort({time: -1})
            .skip((i-1)*10)
            .limit(10)
            .exec((err,doc)=>{
                activityModel.count(query,(err,count)=>{
                    resolve({doc,count});
                });
            }
        );
    });
}
exports.add =async ()=> {
    let activity = new activityModel();
    activity.actId= await counter.getId('actId');
    if(!activity.actId){
        await counter.init();
        activity.actId= await counter.getId('actId');
    }
    activity.title= '新活动';
    activity.time= new Date().getTime();
    activity.status= 1;
    activity.pages= [];

    return new Promise((resolve) => {
        activity.save((err)=>{
            resolve(activity.actId);
        });
    });
}
