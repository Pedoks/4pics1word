require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const emailRoute = require("./routes/email");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", emailRoute);

// ── Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`💌 Server running on port ${PORT}`));