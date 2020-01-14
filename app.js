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
    roomNumbers_ = data.roomNumbers;
    roomNumbers_ = roomNumbers_.substring(1, roomNumbers_.length-1);
    roomNumbers = roomNumbers_.split(', ');
    
    for(var i = 0; i < roomNumbers.length; i++){
      rooms[roomNumbers[i]].addUser(userId, userPosi);

      if(rooms[roomNumbers[i]].detectMatched() == true){
        var matched = rooms[roomNumbers[i]].removeSet();
        io.sockets.emit("matchComplete", matched);
      }
  
      top_ = rooms[roomNumbers[i]].gettop();
      console.log('top : '+top_);
      jungle_ = rooms[roomNumbers[i]].getjungle();
      console.log('jungle : '+jungle_);
      mid_ = rooms[roomNumbers[i]].getmid();
      console.log('mid : '+mid_);
      bottom_ = rooms[roomNumbers[i]].getbottom();
      console.log('bottom : '+bottom_);
      support_ = rooms[roomNumbers[i]].getsupport();
      console.log('support : '+support_);
    }
  });

  socket.on('exitRoom', function(data){
    userId = data.userId;
    userPosi = data.userPosi;
    roomNumber = data.roomNumber;

    rooms[roomNumber].removeUser(userId, userPosi);

    top_ = rooms[roomNumber].gettop();
    console.log('top : '+top_);
    jungle_ = rooms[roomNumber].getjungle();
    console.log('jungle : '+jungle_);
    mid_ = rooms[roomNumber].getmid();
    console.log('mid : '+mid_);
    bottom_ = rooms[roomNumber].getbottom();
    console.log('bottom : '+bottom_);
    support_ = rooms[roomNumber].getsupport();
    console.log('support : '+support_);

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

