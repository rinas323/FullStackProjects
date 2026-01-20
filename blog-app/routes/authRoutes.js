const express = require("express");
const User = require("../models/User");
const router = express.Router();

// GET register
router.get("/register", (req, res) => {
  res.render("register", { error: null });
});

// POST register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.render("register", { error: "All fields are required!" });
    }

    // Basic email format check (optional, simple)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.render("register", { error: "Please provide a valid email address." });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.render("register", { error: "Username or email already taken!" });
    }

    const user = await User.create({ username, email, password });
    // auto-login after register (optional)
    req.session.user = { id: user._id, username: user.username, email: user.email };
    req.flash && req.flash("success", "Account created and logged in.");
    return res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("register", { error: "Something went wrong. Try again." });
  }
});

// GET login
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// POST login
router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) {
      return res.render("login", { error: "All fields are required." });
    }

    // allow login by username OR email
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (user && await user.comparePassword(password)) {
      req.session.user = { id: user._id, username: user.username, email: user.email };
      return res.redirect("/dashboard");
    }

    return res.render("login", { error: "Invalid credentials." });
  } catch (err) {
    console.error(err);
    res.render("login", { error: "Something went wrong." });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

module.exports = router;
