const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/quizzes", require("./routes/quiz"));
app.use("/attempt", require("./routes/attempt"));
app.use("/admin", require("./routes/admin"));

app.listen(5000, () => console.log("Server running"));
