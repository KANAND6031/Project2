const express = require("express");
const router = express.Router();

const Chunk =
require("../models/Chunk");


// Get all uploaded SOPs

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

                            pages: {
                                $max:
                                    "$pageNumber"
                            },

                            chunks: {
                                $sum: 1
                            }
                        }
                    },

                    {
                        $project: {

                            _id: 0,

                            fileName:
                                "$_id",

                            pages: 1,

                            chunks: 1
                        }
                    }
                ]);

            res.json(files);

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error:
                    "Failed to fetch files"
            });
        }
    }
);


// Delete SOP

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
                    "SOP deleted"
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error:
                    "Delete failed"
            });
        }
    }
);


// Re-index Placeholder

router.post(
    "/reindex/:fileName",

    async (req, res) => {

        try {

            res.json({

                success: true,

                message:
                    `${req.params.fileName} re-indexed`
            });

        } catch (error) {

            res.status(500).json({
                error:
                    "Re-index failed"
            });
        }
    }
);

module.exports = router;