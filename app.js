// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
	        console.log(data);
	    });

    client.on('messages', function(data) {
		client.emit('broad', 'received:'+data);
//		client.broadcast.emit('broad',data);
           //client.broadcast.emit('broad',data);
    });

})

//server.listen(4200);
var port = process.env.PORT || 3000;
//app.listen(port);
server.listen(port);
console.log('Server listening at port ' + port);
