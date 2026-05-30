const express =
    require("express");

const router =
    express.Router();

const Chunk =
    require("../models/Chunk");

const generateEmbedding =
    require("../services/embeddingService");


router.post(
    "/search",

    async (req, res) => {

        try {

            const { query } =
                req.body;

            if (!query) {

                return res.status(400).json({
                    error:
                        "Query required",
                });
            }

            console.log(
                "Searching for:",
                query
            );

            const queryEmbedding =
                await generateEmbedding(
                    query
                );

            const results =
                await Chunk.aggregate([
                    {
                        $vectorSearch: {

                            index:
                                "vector_index",

                            path:
                                "embedding",

                            queryVector:
                                queryEmbedding,

                            numCandidates:
                                100,

                            limit: 5,
                        },
                    },

                    {
                        $project: {

                            _id: 0,

                            fileName: 1,

                            chunkIndex: 1,

                            text: 1,

                            wordCount: 1,

                            score: {
                                $meta:
                                    "vectorSearchScore",
                            },
                        },
                    },
                ]);

            res.status(200).json({

                success: true,

                query,

                totalResults:
                    results.length,

                results,
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,

                error:
                    "Retrieval Failed",
            });
        }
    }
);

module.exports = router;