const express = require("express");
const multer = require("multer");
const path = require("path");

const extractPDFText =
    require("../services/pdfService");

const createChunks =
    require("../services/chunkService");

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


// Upload + Parse + Chunk
router.post(
    "/upload",
    upload.single("pdf"),

    async (req, res) => {

        try {

            // File Path
            const filePath = req.file.path;

            // Extract PDF Text
            const pdfData =
                await extractPDFText(filePath);

            // Create Chunks
            const chunks =
                createChunks(pdfData.text);

            console.log(chunks);

            res.status(200).json({

                success: true,

                message:
                    "PDF uploaded and chunked successfully",

                fileName:
                    req.file.filename,

                pages:
                    pdfData.pages,

                totalChunks:
                    chunks.length,

                chunks:
                    chunks.slice(0, 5),
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                success: false,
                message:
                    "Chunking Failed",
            });
        }
    }
);

module.exports = router;