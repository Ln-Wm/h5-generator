const edit = require('../dao/edit');
exports.index={
    params: [':actId'],
    async handler(req, res, next) {
        let actId=req.params.actId;
        const data=await show.findActById(actId);
        res.render('edit/index', {data:JSON.stringify(data)});
    }
};
