const mongoose = require('mongoose');

// Define Schemes
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique:true }, //facebook account, 하나의 계정만 만들도록
  password: {type: String, required: true},
  nickname: {type: String, required: true }, //닉네임은 중복 가능
  tier: {type: String, required: true},
  position: {type: String, required: true},
  voice: {type: String, required: true},
  userEval: {
    amused:{type: Number},
    mental:{type: Number},
    leadership:{type: Number}
  },
  hope_tendency: {type: String},
  hope_num: {type: Number},
  hope_position: {type: [String]},
  hope_voice: {type: String},
  aboutMe: {type: String, required: true},
},
{
  versionKey: false    
});

userSchema.statics.findUserAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find();
};
userSchema.statics.create = function (payload) {
  // this === Model
  const user = new this(payload);
  // return Promise
  return user.save();
};

// Find One by userid
userSchema.statics.findByUserid = function (id) {
  return this.findOne({ id });
};

// Update by userid
userSchema.statics.updateByUserid = function (id, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ id }, payload, { new: true });
};

// Delete by userid
userSchema.statics.deleteByUserid = function (id) {
  return this.deleteOne({ id });
};
// Create Model & Export
module.exports = mongoose.model('User', userSchema);