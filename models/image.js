const mongoose = require('mongoose');

// Define Schemes
const imageSchema = new mongoose.Schema({
  userid: { type: String, required: true }, //facebook account
  imageid: { type: String, required: true, unique: true }, //maybe timestamp
  image_name: { type: String, required: true },
  image: { type: String, default: false }
},
{
  timestamps: true,
  versionKey: false    
});

imageSchema.statics.create = function (payload) {
  // this === Model
  const image = new this(payload);
  // return Promise
  return image.save();
};

// Find User All
imageSchema.statics.findUserAll = function (userid) {
  // return promise
  // V4부터 exec() 필요없음
  if(userid === undefined){ 
    return this.find({})
  }
  return this.find({ userid });
};

// Find One by imageid
imageSchema.statics.findOneByImageid = function (imageid) {
  return this.findOne({ imageid });
};

// Update by imageid
imageSchema.statics.updateByImageid = function (imageid, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ imageid }, payload, { new: true });
};

// Delete by imageid
imageSchema.statics.deleteByImageid = function (imageid) {
  return this.deleteOne({ imageid });
};
// Create Model & Export
module.exports = mongoose.model('Image', imageSchema);