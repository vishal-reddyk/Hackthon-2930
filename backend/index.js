import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

// ------------------ MONGO DB CONNECTION ------------------
const MONGO_URL =
  "mongodb+srv://mynewuser:mypassword123@cluster0.l8ur3qo.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ------------------ USER SCHEMA ------------------
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

const JWT_SECRET = "SUPER_SECRET_KEY";

// ------------------ SIGNUP ------------------
app.post("/signup", async (req, res) => {
  const { username, password, role } = req.body;

  const exists = await User.findOne({ username, role });
  if (exists) {
    return res.json({ success: false, message: "Username already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  await User.create({ username, password: hashed, role });

  res.json({ success: true, message: "Signup success" });
});

// ------------------ LOGIN ------------------
app.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  const user = await User.findOne({ username, role });
  if (!user) return res.json({ success: false, message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false, message: "Wrong password" });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ success: true, token, role: user.role });
});

// ------------------ START SERVER ------------------
app.listen(5000, () => console.log("Backend running on port 5000"));
