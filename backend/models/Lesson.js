// in backend/models/Lesson.js
const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    objective: { type: String, required: true },
    starterCode: { type: String, default: "" },
    expectedOutput: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "normal", "hard"],
      default: "easy",
    },
    rewards: {
      xp: { type: Number, default: 0 },
      badge: { type: String, default: null },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", LessonSchema);
