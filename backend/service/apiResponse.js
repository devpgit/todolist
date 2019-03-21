module.exports = {
    res(code = 200, msg = '', data = []){
        return {
            code,
            msg,
            data
        }
    }
}