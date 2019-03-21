const patchList = require('../service/todolist/patchList');
const response = require('../service/apiResponse');
module.exports = {
    async put(req, res, next){
        // let event = {
        //     'status': req.body.status
        // }
        let event = updateValueHandler(req);
        const result = await patchList(req.body.token, req.body.id, event).catch((err) => {
            res.send({
                ...response.res(),
                code: 500,
                msg: err
            })
        });
        if(result === 'OK'){
            res.send({
                ...response.res(),
                data: 'OK'
            })
        }
    }
}
function updateValueHandler(req){
    let event = {};
    if(req.body.status != null){
        event.status = req.body.status;
    }else{
        event = {
            'summary': `${req.body.summary}`,
            'start': {
                'dateTime': `${req.body.startDate}T00:00:00+08:00`,
                'timeZone': 'Asia/Taipei',
            },
            'end': {
                'dateTime': `${req.body.endDate}T00:00:00+08:00`,
                'timeZone': 'Asia/Taipei',
            }
        };
    }
    return event;
}