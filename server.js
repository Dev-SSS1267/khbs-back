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


app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin || '*'); // 요청된 origin을 그대로 허용합니다.
  },
  credentials: true, // 자격 증명을 포함하여 요청 허용
}));

// OPTIONS 요청에 대한 처리 (Preflight 요청 허용)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.sendStatus(200);
});
// const allowedOrigins = [
//   "http://localhost:5173",           // 개발 서버 주소
//   "https://your-production-link.com"  // 실제 배포 URL
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // 요청의 출처가 allowedOrigins에 포함되어 있거나, undefined(예: 서버 간 요청)인 경우 허용
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // 자격 증명을 포함한 요청 허용 설정
// }));

app.options("*", cors()); // 모든 경로에 대해 OPTIONS 메서드를 허용

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
