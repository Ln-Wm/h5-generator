const show = require('../dao/show');
exports.index={
    params: [':actId'],
    async handler(req, res, next) {
        let actId=req.params.actId;
        const data=await show.findActById(actId);
        res.render('show/index', {data:JSON.stringify(data)});
    }
};
