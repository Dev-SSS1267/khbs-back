const express = require("express");
const router = express.Router();
const { getSchedules, addSchedule, updateSchedule, deleteSchedule } = require("../controllers/scheduleController");

// 일정 가져오기
router.get("/", getSchedules);

// 일정 추가 (관리자만)
router.post("/", addSchedule);

// 일정 수정
router.put("/:id", updateSchedule);

// 일정 삭제 (관리자만)
router.delete("/:id", deleteSchedule);

module.exports = router;
