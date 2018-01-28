const edit = require('../dao/edit');
exports.index={
    params: [':actId'],
    async handler(req, res, next) {
        let actId=req.params.actId;
        const data=await edit.findActById(actId);
        res.render('edit/index', {data:JSON.stringify(data)});
    }
};
