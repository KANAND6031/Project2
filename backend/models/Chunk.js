const mongoose = require("mongoose");

const chunkSchema =
new mongoose.Schema({

    fileName: String,

    pageNumber: Number,

    section: String,

    chunkIndex: Number,

    text: String,

    charCount: Number,

    embedding: [Number],

    metadata: {

        startChar: Number,

        endChar: Number,
    },
});

module.exports =
    mongoose.model(
        "Chunk",
        chunkSchema
    );