const mongoose=require('mongoose');
const suningDBC=require('../db/suningDB');

//User Schema
const countSchema = new mongoose.Schema({
    name   :  { type: String, unique: true},
    count  :  { type: Number, default: 0 }
});
const counter = suningDBC.model('counters', countSchema);

exports.getId = (name)=>{
    return new Promise((resolve) => {
        counter.findOneAndUpdate({name:name},{$inc:{count:1}},{new:true,setDefaultsOnInsert:true})
        .exec((error,doc)=>{
            resolve(doc.count);
        });
    });
}
