const response = require('../service/apiResponse');
const getList = require('../service/todolist/getList');
module.exports = { 
    async list(req, res, next){
        const list = await getList(req.param('token')).catch((err)=>{
            res.send({
                ...response.res(),
                code: 500,
                msg: err
            })
        });

        if(list != null){
            res.send({
                ...response.res(),
                data: list.items
            })
        }
    }
}