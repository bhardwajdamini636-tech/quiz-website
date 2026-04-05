const express = require("express");
const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth(["student"]), async (req, res) => {
  const { quiz_id, answers, is_practice } = req.body;

  const questions = await Question.find({ quiz_id });

  let score = 0;

  questions.forEach((q, i) => {
    if (q.correct_answer === answers[i]) score++;
  });

  if (!is_practice) {
    await Attempt.create({
      student_id: req.user.id,
      quiz_id,
      score,
      is_practice
    });
  }

  res.json({ score });
});

router.get("/leaderboard/:quiz_id", async (req, res) => {
  const data = await Attempt.find({
    quiz_id: req.params.quiz_id,
    is_practice: false
  }).sort({ score: -1 });

  res.json(data);
});

module.exports = router;
