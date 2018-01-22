const show = require('../dao/show');
exports.index=async (req, res)=>{
    let data={};
    res.render('index', {data:JSON.stringify(data)});
}
