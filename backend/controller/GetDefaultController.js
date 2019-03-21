const getDefault = require('../service/todolist/getDefault');
const response = require('../service/apiResponse');
module.exports = {
    async get(req, res, next){
        console.log('default',req.param('token'), req.params.id);
        const result = await getDefault(req.param('token'), req.params.id).catch((err)=>{
            res.send({
                ...response.res(),
                code: 500,
                msg: err
            })
        })

        if(result != null){
            res.send({
                ...response.res(),
                data: result
            })
        }
    }
}