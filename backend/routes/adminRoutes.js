const express = require("express");
const router = express.Router();

const Chunk =
require("../models/Chunk");

// Get all uploaded files

router.get(
    "/files",
    async (req, res) => {

        try {

            const files =
                await Chunk.aggregate([
                    {
                        $group: {
                            _id:
                                "$fileName",

                            chunks: {
                                $sum: 1
                            },

                            pages: {
                                $max:
                                    "$pageNumber"
                            }
                        }
                    }
                ]);

            res.json(files);

        } catch (error) {

            res.status(500).json({
                error:
                    "Failed to fetch files"
            });
        }
    }
);

// Delete file

router.delete(
    "/file/:fileName",
    async (req, res) => {

        try {

            await Chunk.deleteMany({
                fileName:
                    req.params.fileName
            });

            res.json({
                success: true,
                message:
                    "File deleted"
            });

        } catch (error) {

            res.status(500).json({
                error:
                    "Delete failed"
            });
        }
    }
);

module.exports = router;