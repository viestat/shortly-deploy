var app = require('./server-config.js');

var port = process.env.port || 4568; 
var host = process.env.HOST || "127.0.0.1";

app.listen(port, host);

console.log('Server now listening on port ' + port);

exports.host = host;