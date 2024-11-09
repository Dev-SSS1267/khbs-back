const Schedule = require("../models/Schedule");

// 모든 스케줄 조회
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ date: 1 }); // 날짜순으로 정렬
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 스케줄 등록
exports.addSchedule = async (req, res) => {
  const { author, title, content, date, img } = req.body;
  try {
    const newSchedule = new Schedule({ author, title, content, date, img });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 스케줄 수정
exports.updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { title, content, date, img } = req.body;

  try {
    const schedule = await Schedule.findById(id);
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });

    if (title) schedule.title = title;
    if (content) schedule.content = content;
    if (date) schedule.date = date;
    if (img) schedule.img = img;
    schedule.createDate = Date.now();

    await schedule.save();
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 스케줄 삭제
exports.deleteSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const schedule = await Schedule.findByIdAndDelete(id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json({ message: "Schedule deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
