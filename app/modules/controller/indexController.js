const indexP = require('../dao/index');
exports.index=async (req, res)=>{
    let list=await indexP.list();
    res.render('index', {data:JSON.stringify(list)});
}
exports.addAjax=async (req, res)=>{
    let actId=await indexP.add();
    res.json({
        success:true,
        actId:actId
    })
}
