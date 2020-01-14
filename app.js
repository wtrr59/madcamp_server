// ENV
require('dotenv').config();
// DEPENDENCIES
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = require('express')();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server);
var room = require('./models/room');
var Chat = require('./models/chat');
var rooms = [];

for(var i = 0 ; i < 144 ; i++){
  var num;
  num = i%16 %8 %4;
  room_ = new room(num);
  rooms.push(room_);
}

const port = process.env.PORT || 80;

// Body-parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// Node의 native Promise 사용
mongoose.Promise = global.Promise;


// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useFindAndModify:true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));


// ROUTERS
/*app.use('/contacts', require('./routes/contacts'));
app.use('/images', require('./routes/images'));
app.use('/gatherings', require('./routes/gatherings'));*/
app.use('/users', require('./routes/users'));



const serv = app.listen(port, () => console.log(`Server listening on port ${port}`));
io = socketio.listen(serv);

io.on('connection', function(socket){
  console.log('Socket ID : ' + socket.id + ', Connect');
  socket.on('clientMessage', function(data){
    console.log('Client Message : ' + data);

    var message = { 
      msg : 'server',
      data : 'refresh'
    };
    io.sockets.emit('serverMessage', message);
  });

  socket.on('enterRoom', function(data){
    userId = data.userId;
    userPosi = data.userPosi;
    roomNumber = data.roomNumber;
    
    rooms[roomNumber].addUser(userId, userPosi);

    if(rooms[roomNumber].detectMatched() == true){
      var matched = rooms[roomNumber].removeSet();
      /*if(roomNumber + 4 < 144) rooms[roomNumber+4].removeUser(userId, userPosi);
      if(roomNumber + 8 < 144) rooms[roomNumber+8].removeUser(userId, userPosi);
      if(roomNumber + 12 < 144) rooms[roomNumber+12].removeUser(userId, userPosi);
      if(roomNumber - 4 >= 0) rooms[roomNumber-4].removeUser(userId, userPosi);
      if(roomNumber - 8 >= 0) rooms[roomNumber-8].removeUser(userId, userPosi);
      if(roomNumber - 12 >= 0) rooms[roomNumber-12].removeUser(userId, userPosi);*/

      io.sockets.emit("matchComplete", matched);
    }
  });

  socket.on('MakeChatRoom',function(data){
    console.log(data.roomid);
    console.log(' room join');
    Chat.create(data,function(){
      socket.join(data.roomid);
      console.log(data.roomid);
      console.log(' room join');
    })
    .catch(err => res.status(500).send(err));
  });

  socket.on('ready', function(data){
    io.sockets.emit('receiveReady', data);
    console.log('send ready');
  });

  socket.on('unready', function(data){
    io.sockets.emit('receiveUnReady', data);
    console.log('send unready');
  });
});

