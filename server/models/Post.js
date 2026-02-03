const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: Date.now,
    },
    updatedAt: {
         type: Date,
        required: Date.now,
    },
});

module.exports = mongoose.model("Post", PostSchema);