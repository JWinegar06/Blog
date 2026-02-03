const Post = require("../models/Post");

function insertPostData() {
    Post.insertMany([
      {
        title: "Post One",
        body: " First post goes here",
      },
      {
        title: "Post One",
        body: " Second post goes here",
      },
   ]);
}

// insertPostData(); Comment this out after saving and running it once so you can check for inserted data
