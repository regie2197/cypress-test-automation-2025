const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.post("/login", (req, res) => {
  const { password } = req.body;
  if (password === "securepassword") {
    res.cookie("session_id", "12345", { httpOnly: true });
    res.cookie("identity_session_id", "67890", { httpOnly: true });
    return res.json({ session_id: "12345", identity_session_id: "67890" });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

app.listen(5001, () => console.log("Backend running on port 5001"));