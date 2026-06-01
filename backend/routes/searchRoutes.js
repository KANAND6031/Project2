const express =
    require("express");

const router =
    express.Router();

const Chunk =
    require("../models/Chunk");

const generateEmbedding =
    require("../services/embeddingService");

const generateAnswer =
    require("../services/geminiService");

const buildPrompt =
    require("../services/promptService");


router.post(
    "/search",

    async (req, res) => {

        try {

            const { query } =
                req.body;

            if (!query) {

                return res.status(400).json({

                    success: false,

                    error:
                        "Query required",
                });
            }

            console.log(
                "Searching for:",
                query
            );

            // Generate embedding for user query
            const queryEmbedding =
                await generateEmbedding(
                    query
                );

            // Vector Search
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

                            limit:
                                5,
                        },
                    },

                    {
                        $project: {

                            _id: 0,

                            fileName: 1,

                            chunkIndex: 1,

                            text: 1,

                            score: {
                                $meta:
                                    "vectorSearchScore",
                            },
                        },
                    },
                ]);

            // No matching chunks
            if (
                results.length === 0
            ) {

                return res.status(200).json({

                    success: true,

                    answer:
                        "I don't know based on uploaded SOPs.",

                    sources: [],
                });
            }

            // Build Context
            const context =

                results
                    .map(
                        (chunk) =>

                            `Chunk ${chunk.chunkIndex}

${chunk.text}`
                    )
                    .join("\n\n");

            // Build Prompt
            const prompt =
                buildPrompt(
                    query,
                    context
                );

            // Gemini Answer
            const answer =
                await generateAnswer(
                    prompt
                );

            res.status(200).json({

                success: true,

                answer,

                sources:

                    results.map(
                        (item) => ({

                            chunk:
                                item.chunkIndex,

                            score:
                                item.score,
                        })
                    ),
            });

        } catch (error) {

            console.error(
                "Search Error:",
                error
            );

            res.status(500).json({

                success: false,

                error:
                    "Retrieval Failed",
            });
        }
    }
);

module.exports = router;