const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  author: { type: String },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Song", SongSchema);
