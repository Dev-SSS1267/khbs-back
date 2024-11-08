const express = require("express");
const router = express.Router();
const {
  getIssues,
  addIssue,
  addResponse,
} = require("../controllers/issueController");

// 모든 문의 목록 조회
router.get("/", getIssues);

// 새로운 문의 등록
router.post("/", addIssue);

// 문의에 대한 답변 추가
router.post("/:id/response", addResponse);

module.exports = router;
