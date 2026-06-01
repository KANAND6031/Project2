const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI =
    new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
    );

async function generateAnswer(
    prompt
) {

    try {

        const model =
            genAI.getGenerativeModel({
                model: "gemini-2.0-flash"
            });

        const result =
            await model.generateContent(
                prompt
            );

        console.log(
            result.response.text()
        );

        return result.response.text();

    } catch (error) {

        console.error(
            "Gemini Error:",
            error
        );

        throw error;
    }
}

module.exports = generateAnswer;