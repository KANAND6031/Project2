const mongoose = require("mongoose");

const chunkSchema = new mongoose.Schema({
    fileName: String,

    chunkIndex: Number,

    text: String,

    wordCount: Number,

    embedding: [Number],

    metadata: {
        startWord: Number,
        endWord: Number,
    },
});

module.exports =
    mongoose.model(
        "Chunk",
        chunkSchema
    );