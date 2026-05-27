const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generateEmbedding = async (text) => {

    try {

        const response =
            await client.embeddings.create({

                model: "text-embedding-3-small",

                input: text,
            });

        return response.data[0].embedding;

    } catch (error) {

        console.log(error);

        throw new Error(
            "Embedding Generation Failed"
        );
    }
};

module.exports = generateEmbedding;