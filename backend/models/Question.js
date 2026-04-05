const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  quiz_id: mongoose.Schema.Types.ObjectId,
  question_text: String,
  options: [String],
  correct_answer: Number
});

module.exports = mongoose.model("Question", questionSchema);
