const express = require("express");
const multer = require("multer");
const path = require("path");

const extractPDFText = require("../services/pdfService");

const router = express.Router();


// Storage Config
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);
    },
});


// PDF Filter
const fileFilter = (req, file, cb) => {

    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files allowed"), false);
    }
};


const upload = multer({
    storage,
    fileFilter,
});


// Upload + Parse Route
router.post(
    "/upload",
    upload.single("pdf"),
    async (req, res) => {

        try {

            // Uploaded file path
            const filePath = req.file.path;

            // Extract text
            const pdfData =
                await extractPDFText(filePath);

            console.log(pdfData.text);

            res.status(200).json({

                success: true,

                message:
                    "PDF uploaded and parsed successfully",

                fileName: req.file.filename,

                pages: pdfData.pages,

                extractedText:
                    pdfData.text.substring(0, 1000),
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                success: false,
                message: "PDF Parsing Failed",
            });
        }
    }
);

module.exports = router;