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
                ]);

            res.json(results);

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error:
                    "Search failed",
            });
        }
    }
);

module.exports = router;