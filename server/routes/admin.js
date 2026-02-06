const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "process.env.JWT_SECRET";
const adminLayout = "../views/layouts/admin";

/**
 * Check Login Middleware
 */
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

/**
 * GET /
 * Admin - Check Login
 */
router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "A blog template made with NodeJS and ExpressJS",
    };

    res.render("admin/index", { locals, layout, adminLayout });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST /login
 * Admin - Login Account
 */
router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!token) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/**
 * Get /dashboard
 * Admin - Dashboard
 */
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Dashboard",
      description: "A blog template made with NodeJS and ExpressJS",
    };

    res.render("admin/index", { locals, layout, adminLayout });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
