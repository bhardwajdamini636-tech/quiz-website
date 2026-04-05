const express = require("express");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth(["teacher"]), async (req, res) => {
  const { title, description, questions } = req.body;

  const quiz = await Quiz.create({
    title,
    description,
    created_by: req.user.id
  });

  for (let q of questions) {
    await Question.create({
      quiz_id: quiz._id,
      ...q
    });
  }

  res.json(quiz);
});

router.get("/", async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

router.get("/:id", async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  const questions = await Question.find({ quiz_id: quiz._id });
  res.json({ quiz, questions });
});

module.exports = router;
