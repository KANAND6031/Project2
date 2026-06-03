const express = require("express");
const multer = require("multer");
const path = require("path");

const extractPDFText =
    require("../services/pdfService");

const createChunks =
    require("../services/chunkService");

const generateEmbedding =
    require("../services/embeddingService");

const Chunk =
    require("../models/Chunk");

const router = express.Router();


// Storage Config
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            path.extname(file.originalname);

        cb(null, uniqueName);
    },
});


// PDF Filter
const fileFilter = (req, file, cb) => {

    if (file.mimetype === "application/pdf") {

        cb(null, true);

    } else {

        cb(
            new Error("Only PDF files allowed"),
            false
        );
    }
};


const upload = multer({
    storage,
    fileFilter,
});


// Upload + Parse + Chunk + Embedding + Store
router.post(
    "/upload",
    upload.single("pdf"),

    async (req, res) => {

        try {

            // Uploaded file path
            const filePath =
                req.file.path;

            // Extract PDF text
            const pdfData =
                await extractPDFText(filePath);

            // Create chunks
            const chunks =
                createChunks(pdfData.text);

            // Generate embeddings
            const embeddedChunks = [];

            for (const chunk of chunks) {

                console.log(
                    `Generating embedding for chunk ${chunk.chunkIndex}`
                );

                const embedding =
                    await generateEmbedding(
                        chunk.text
                    );

                embeddedChunks.push({

                    fileName:
                        req.file.originalname,

                    pageNumber:
                        chunk.pageNumber,

                    section:
                        chunk.section,

                    chunkIndex:
                        chunk.chunkIndex,

                    text:
                        chunk.text,

                    charCount:
                        chunk.charCount,

                    embedding,

                    metadata:
                        chunk.metadata,
                });
            }

            // Remove previous chunks of same file
            await Chunk.deleteMany({
                fileName:
                    req.file.originalname,
            });

            // temporary fix....
            await Chunk.deleteMany({});

            // Store in MongoDB
            await Chunk.insertMany(
                embeddedChunks
            );

            console.log(
                `Stored ${embeddedChunks.length} chunks`
            );

            res.status(200).json({

                success: true,

                message:
                    "Chunks stored successfully",

                pages:
                    pdfData.pages,

                totalChunks:
                    embeddedChunks.length,

                sampleEmbedding:
                    {
                        chunkIndex:
                            embeddedChunks[0]
                                .chunkIndex,

                        charCount:
                            embeddedChunks[0].charCount,

                        embedding:
                            embeddedChunks[0]
                                .embedding,
                    },
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,

                message:
                    "Embedding Generation Failed",
            });
        }
    }
);

module.exports = router;