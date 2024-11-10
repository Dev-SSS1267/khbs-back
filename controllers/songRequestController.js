const Song = require("../models/Song");

// 모든 공지사항 조회
exports.getSongs = async (req, res) => {
  try {
    const Songs = await Song.find().sort({ createDate: -1 });
    res.json(Songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 공지사항 등록
exports.addSong = async (req, res) => {
  const { author, title, artist } = req.body;
  try {
    const newSong = new Song({ author, title, artist });
    await newSong.save();
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 특정 공지사항 조회
exports.getSong = async (req, res) => {
  const { id } = req.params;
  try {
    const Song = await Song.findById(id);
    if (!Song) return res.status(404).json({ message: "Song not found" });
    res.json(Song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 공지사항 수정
exports.updateSong = async (req, res) => {
  const { id } = req.params;
  const { title, artist, done } = req.body;

  try {
    const Song = await Song.findById(id);
    if (!Song) return res.status(404).json({ message: "Song not found" });

    if (title) Song.title = title;
    if (artist) Song.artist = artist;
    if (done) Song.done = done;
    Song.createDate = Date.now();

    await Song.save();
    res.json(Song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//공지사항 삭제
exports.deleteSong = async (req, res) => {
  try {
    const SongId = req.params.id;

    // 공지사항 삭제
    const deletedSong = await Song.findByIdAndDelete(SongId);

    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error("Error deleting Song:", error); // 오류 로그 출력
    res.status(500).json({ message: "Internal Server Error" });
  }
};
