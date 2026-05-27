const { GoogleGenerativeAI } =
    require("@google/generative-ai");

const genAI =
    new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
    );


const generateEmbedding = async (text) => {

    try {

        const model =
            genAI.getGenerativeModel({
                model: "text-embedding-004",
            });

        const result =
            await model.embedContent(text);

        return result.embedding.values;

    } catch (error) {

        console.log(error);

        throw new Error(
            "Embedding Generation Failed"
        );
    }
};

module.exports = generateEmbedding;