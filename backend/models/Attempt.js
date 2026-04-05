const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  student_id: mongoose.Schema.Types.ObjectId,
  quiz_id: mongoose.Schema.Types.ObjectId,
  score: Number,
  is_practice: Boolean
});

module.exports = mongoose.model("Attempt", attemptSchema);
