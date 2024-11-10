const express = require("express");
const router = express.Router();
const { getSongs, addSong, getSong, updateSong, deleteSong } = require("../controllers/songRequestController");

// 공지 가져오기
router.get("/", getSongs);

// 공지 추가 (관리자만)
router.post("/", addSong);

// 공지 수정 (관리자만)
router.put("/:id", updateSong);

// 특정 공지사항 조회
 router.get("/:id", getSong);

// 공지 삭제 (관리자만)
router.delete("/:id", deleteSong);

module.exports = router;
