const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const issueRoutes = require("./routes/issueRoutes"); // 추가한 라우트

const app = express();

app.use(express.json());
require("dotenv").config();
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/issues", issueRoutes); // 문의 라우트 추가

const cors = require("cors");
const allowedOrigins = [
  "http://localhost:5173",   // 로컬 개발 서버
  "https://khbs.kyunggi.club" // 실제 배포 URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // 쿠키를 포함한 요청 허용
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
