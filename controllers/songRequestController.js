const Song = require("../models/Song");

// 모든 공지사항 조회
exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createDate: -1 });
    res.json(songs);
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
    const songGet = await Song.findById(id);
    if (!songGet) return res.status(404).json({ message: "Song not found" });
    res.json(songGet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSong = async (req, res) => {
  const { id } = req.params;
  const { done } = req.body; // done 필드는 Boolean 타입

  try {
    // ID로 노래 찾기
    const songUpdate = await Song.findById(id);
    if (!sonUpdate) return res.status(404).json({ message: "Song not found" });

    // done 필드가 Boolean이면 업데이트
    if (typeof done === 'boolean') songUpdate.done = done;
    sonUpdate.createDate = Date.now();

    // 변경 사항 저장
    await songUpdate.save();
    res.json(songUpdate);
  } catch (error) {
    console.error("Error updating song:", error);
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
