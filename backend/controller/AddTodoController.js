const response = require('../service/apiResponse');
const addList = require('../service/todolist/addList');
module.exports = {
    async add(req, res, next){
        const result = await addList(req).catch((err) => {
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