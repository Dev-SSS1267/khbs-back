const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  author: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  date: { type: Date, required: true },
  img: { type: String, required: false },
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
