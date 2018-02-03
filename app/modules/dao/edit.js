//edit dao
const activityModel = require('../model/activitySchema');
exports.findActById = (actId)=>{
    return new Promise((resolve) => {
        activityModel.findOne({actId:actId})
        .exec(function(err,doc){
            resolve(doc);
        });
    });
}
exports.saveActivity = (actId,data)=>{
    return new Promise((resolve) => {
        activityModel.update({actId:actId},{$set:data})
        .exec(function(err,doc){
            resolve(doc);
        });
    });
}
