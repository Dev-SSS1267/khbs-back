const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  title: { type: String, required: true },             // 문의 제목
  description: { type: String, required: true },       // 문의 내용
  location: { type: String, required: true },          // 문의 위치
  response: { type: String },                          // 답변
  createdAt: { type: Date, default: Date.now },        // 생성일자
});

module.exports = mongoose.model("Issue", IssueSchema);
