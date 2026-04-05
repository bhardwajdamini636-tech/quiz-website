const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashed, role });
  res.json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.sendStatus(404);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.sendStatus(401);

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secret"
  );

  res.json({ token });
});

module.exports = router;
