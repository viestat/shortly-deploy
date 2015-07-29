var app = require('./server-config.js');

var port = process.env.port || 4568; 
console.log(port); //changed to softcoded port

app.listen(port);

console.log('Server now listening on port ' + port);
