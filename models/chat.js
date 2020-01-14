const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userid: { type: String, required: true, unique:true }, //facebook account, 하나의 계정만 만들도록
    nickname: {type: String, required: true }, //닉네임은 중복 가능
    text: {type: String, required: true},
    time: {type: String, required: true},
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
  
  module.exports = mongoose.model('Chat', chatSchema);