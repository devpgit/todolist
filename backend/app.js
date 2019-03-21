const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const passport = require('passport');

require('./config/config');
require('./service/googlePassport');

var app = express();
var server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json({limit: '8000kb'}));
app.use('/api', api);

server.listen(process.env.PORT, () => {
    console.log('Listening on prot 5000 ')
})
