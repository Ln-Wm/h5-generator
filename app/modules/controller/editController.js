const edit = require('../dao/edit');
exports.index=async (req, res)=>{
    let data={};
    res.render('index', {data:JSON.stringify(data)});
}
