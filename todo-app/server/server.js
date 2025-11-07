const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const todosRouter = require("./routes/todos");

const app = express();
const PORT = 4000;
const SECRET = "supersecret";

app.use(cors({
  origin: "http://localhost:5173", // your Vite dev server
  credentials: true, // allow cookies
}));
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (_, res) => res.send("✅ Todo backend running"));

// Public routes
app.use("/auth", authRouter);

// JWT auth middleware
function authenticate(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

// Protected routes
app.use("/todos", authenticate, todosRouter);

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

