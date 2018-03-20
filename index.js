var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var people = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    io.emit('chat message', '--' + socket.client.id + ' has just joined the room')

    socket.on('chat message', function (msg) {
        io.emit('chat message', '[' + socket.id + ']: ' + msg);
        console.log("Message sent");
    });

    // creates left room message with socket ID
    socket.on('disconnect', function () {
        io.emit('chat message', '--' + socket.id + 'has just left the room')
        console.log("User disconnected");
    });
});

http.listen(3000, '0.0.0.0', function(){
  console.log('listening on 0.0.0.0:3000');
});
