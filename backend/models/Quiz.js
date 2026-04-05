const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: String,
  description: String,
  created_by: mongoose.Schema.Types.ObjectId,
  start_time: Date,
  end_time: Date
});

module.exports = mongoose.model("Quiz", quizSchema);
