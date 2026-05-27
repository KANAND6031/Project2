const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI =
    new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
    );

const generateEmbedding = async (text) => {

    try {

        const embeddingModel =
            genAI.getGenerativeModel({
                model: "embedding-001",
            });

        const result =
            await embeddingModel.embedContent(text);

        return result.embedding.values;

    } catch (error) {

        console.log(error);

        throw new Error(
            "Embedding Generation Failed"
        );
    }
};

module.exports = generateEmbedding;