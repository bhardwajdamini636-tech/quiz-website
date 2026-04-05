const express = require("express");
const User = require("../models/User");
const Quiz = require("../models/Quiz");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/users", auth(["admin"]), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.delete("/users/:id", auth(["admin"]), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

router.get("/quizzes", auth(["admin"]), async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

module.exports = router;
