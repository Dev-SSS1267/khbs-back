const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const issueRoutes = require("./routes/issueRoutes"); // 추가한 라우트

const app = express();

const cors = require("cors");
const allowedOrigins = [
  "http://localhost:5173",   // 로컬 개발 서버
  "https://your-production-link.com" // 실제 배포 URL
];

// CORS 설정 - 반드시 서버 초기 설정에 포함
app.use(cors({
  origin: allowedOrigins, // 모든 출처 허용 - Postman 테스트용으로 모든 origin 허용
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept"],
}));

app.use(express.json());
require("dotenv").config();
connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/issues", issueRoutes); // 문의 라우트 추가

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
