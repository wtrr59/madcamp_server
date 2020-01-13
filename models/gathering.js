const mongoose = require('mongoose');

// Define Schemes
const gatheringSchema = new mongoose.Schema({
  userid: {type: [String], required: true}, //참석자 배열, 개설자 구분 X 
  gatheringid: { type: String, required: true, unique: true }, //모임 id, unique해야함 -> 개설 시간
  destination: { type: String, required: true }, //목적지
  expireAt: { type: Date, required: true}, //모임 시간이자 마감 시간, Date type
  departure: { type: String, required: true }, //출발지
  count: { type: String, required: true} //모집 인원
},
{
  versionKey: false    
});
gatheringSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 1800 }) //expire 시간 30분 뒤 삭제
//마감 후 expire될 때, 참석자들에게 notify?


gatheringSchema.statics.create = function (payload) {
  const gathering = new this(payload);
  return gathering.save();
}; //개설할 때 join collection에도 request 보내기

// 모든 모임 표시
gatheringSchema.statics.findGatheringAll = function () {
  return this.find({ });
};

// 참석한 모임 검색 by userid -> 배열이라 현재는 불가능
gatheringSchema.statics.findByUserid = function (userid) {
  return this.find({ userid });
};

// 방 정보 수정? 추가 or 취소 -> 참석자 배열은 어플에서 처리! 
gatheringSchema.statics.updateByGatheringid = function (gatheringid, payload) {
  return this.findOneAndUpdate({ gatheringid }, payload, { new: true });
};

// 모임 삭제? -> 해당 방에 등록된 내역 모두 삭제해야함!
gatheringSchema.statics.deleteByGatheringid = function (gatheringid) {
  return this.deleteOne({ gatheringid });
};
// Create Model & Export
module.exports = mongoose.model('Gathering', gatheringSchema);