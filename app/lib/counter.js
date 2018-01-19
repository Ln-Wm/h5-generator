// 计数器
const mongoose=require('mongoose');
const DBC=require('../db/DB');

const countSchema = new mongoose.Schema({
    name   :  { type: String, unique: true},
    count  :  { type: Number, default: 0 }
});
const counter = DBC.model('counters', countSchema);

exports.getId = (name)=>{
    return new Promise((resolve) => {
        counter.findOneAndUpdate({name:name},{$inc:{count:1}},{new:true,setDefaultsOnInsert:true})
        .exec((err,doc)=>{
            if(doc){
                resolve(doc.count);
            }else{
                resolve(false);
            }
        });
    });
}

exports.init =()=> {
    let count = new counter();
    count.name= 'actId';
    count.count= 0;
    return new Promise((resolve) => {
        count.save((err)=>{
            resolve(err);
        });
    });
}
