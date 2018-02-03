const edit = require('../dao/edit');
exports.index={
    params: [':actId'],
    async handler(req, res, next) {
        let actId=req.params.actId;
        const data=await edit.findActById(actId);
        res.render('edit/index', {data:JSON.stringify(data)});
    }
};
exports.saveAjax={
    method: 'POST',
    async handler(req, res) {
        let data={
            title:req.body.title,
        	keywords: req.body.keywords,
        	description: req.body.description,
        	shareImg: req.body.shareImg,
            pages: req.body.pages,
            pageIndex: req.body.pageIndex,
        }
        await edit.saveActivity(req.body.actId,data);
        res.json({success:true});
    }
};
