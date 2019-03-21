const delList = require('../service/todolist/delList');
const response = require('../service/apiResponse');
module.exports = {
    async del(req, res, next){
        const result = await delList(req.body.token, req.body.id).catch((err) => {
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