const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatuserid: { type: String, required: true}, 
    nickname: {type: String, required: true}, 
    text: {type: String, required: true},
    texttime: {type: String, required: true},
    roomid: {type: String, required: true}
  },
  {
    versionKey: false    
  });

  chatSchema.statics.create = function (payload) {
    // this === Model
    const chat = new this(payload);
    // return Promise
    return chat.save();
  };

  chatSchema.statics.deleteByRoomid = function (roomid) {
    return this.deleteMany({ roomid });
  };
  
  chatSchema.statics.findUserAll = function (roomid) {
    // return promise
    // V4부터 exec() 필요없음
    if(roomid === undefined){ 
      return this.find({ })
    }
    return this.find({ roomid });
  };
  
  module.exports = mongoose.model('Chat', chatSchema);