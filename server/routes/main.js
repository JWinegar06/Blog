const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Home Page

router.get("/", async (req, res)=> {
  const locals = {
    title: "Blog",
    description: "A Blog template",
  };

try {
  const data = await Post.find().sort({ createdAt: "desc" });
  res.render("index", {locals, data});
} catch (error) {
  console.log(error)
}
});

module.exports = router;