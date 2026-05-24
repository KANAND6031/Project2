const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();


// Storage Configuration
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


// File Filter
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


// Upload Route
router.post(
    "/upload",
    upload.single("pdf"),
    (req, res) => {

        try {

            res.status(200).json({
                success: true,
                message: "PDF uploaded successfully",
                file: req.file,
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: "Upload failed",
            });
        }
    }
);

module.exports = router;