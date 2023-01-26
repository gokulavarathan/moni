var express = require('express'),
cors = require('cors'),
bodyParser = require('body-parser'),
http = require('http'),
path = require('path'),
fs = require('fs'),
https = require('https'),
logger = require('morgan'),
socketio = require('socket.io');

var config = require('./configdetails_cc/UasjNASDHwRE');
var app = express();
require('./configdetails_cc/ZXNhYmF0YWQ');

app.use(cors());
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname })
})
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
  return next()
})
app.use(
 /*require('./routes_ss/user/get'),*/
 require('./routes_ss/user/post'),
 require('./routes_ss/admin/admin'),
 require('./routes_ss/admin/config'),
 require('./routes_ss/admin/subadmin'),
 require('./routes_ss/admin/location'),
 require('./routes_ss/user/buysell'),
 require('./routes_ss/user/transfer'),
 require('./routes_ss/admin/template'), 
 require('./routes_ss/admin/crypto'),
 require('./routes_ss/admin/support'),
 require('./routes_ss/admin/block'),
 require('./routes_ss/admin/cms'),
 require('./routes_ss/cron-security'),
  );

var server;
//  if (process.env.NODE_ENV == 'devel' || process.env.NODE_ENV == 'local')
  server = http.createServer(app);
//  else {
//   var options = {
//     key: fs.readFileSync('monifiex.key'),
//     cert: fs.readFileSync('monifiex.crt')
//   };
//   server = https.createServer(options, app);
// }
server.listen(config.port, () => console.log(`Server initiated and running on port ${config.port}`));

