const express = require("express");
const multer = require("multer");
const path = require("path");

const extractPDFText =
    require("../services/pdfService");

const createChunks =
    require("../services/chunkService");

const generateEmbedding =
    require("../services/embeddingService");

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


// Upload + Parse + Chunk + Embedding
router.post(
    "/upload",
    upload.single("pdf"),

    async (req, res) => {

        try {

            // File Path
            const filePath =
                req.file.path;

            // Extract Text
            const pdfData =
                await extractPDFText(filePath);

            // Create Chunks
            const chunks =
                createChunks(pdfData.text);

            // Generate Embeddings
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

                    chunkIndex:
                        chunk.chunkIndex,

                    text:
                        chunk.text,

                    wordCount:
                        chunk.wordCount,

                    embedding,

                    metadata:
                        chunk.metadata,
                });
            }

            console.log(
                embeddedChunks[0]
            );

            res.status(200).json({

                success: true,

                message:
                    "Embeddings generated successfully",

                pages:
                    pdfData.pages,

                totalChunks:
                    embeddedChunks.length,

                sampleEmbedding:
                    embeddedChunks[0],
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