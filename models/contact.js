const mongoose = require('mongoose');

// Define Schemes
const contactSchema = new mongoose.Schema({
  userid: { type: String, required: true }, //facebook account
  contactid: {type: String, required: true, unique: true}, 
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
  profile_pic: { type: String, default: false }
},
{
  timestamps: true,
  versionKey: false    
});

contactSchema.statics.create = function (payload) {
  // this === Model
  const contact = new this(payload);
  // return Promise
  return contact.save();
};

// Find User All contacts
contactSchema.statics.findUserAll = function (userid) {
  // return promise
  // V4부터 exec() 필요없음
  if(userid === undefined){ 
    return this.find({ })
  }
  return this.find({ userid });
};

// Find One by contactid
contactSchema.statics.findOneByContactid = function (contactid) {
  return this.findOne({ contactid });
};

// Update by contactid
contactSchema.statics.updateByContactid = function (contactid, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ contactid }, payload, { new: true });
};

// Delete by contactid
contactSchema.statics.deleteByContactid = function (contactid) {
  return this.deleteOne({ contactid });
};
// Create Model & Export
module.exports = mongoose.model('Contact', contactSchema);