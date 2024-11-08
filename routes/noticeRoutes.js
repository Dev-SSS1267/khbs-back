const express = require("express");
const router = express.Router();
const { getNotices, addNotice, updateNotice, deleteNotice } = require("../controllers/noticeController");

// 공지 가져오기
router.get("/", getNotices);

// 공지 추가 (관리자만)
router.post("/", addNotice);

// 공지 수정 (관리자만)
router.put("/:id", updateNotice);

// 공지 삭제 (관리자만)
router.delete("/:id", deleteNotice);

module.exports = router;
