const {
    GoogleGenerativeAI
} = require(
    "@google/generative-ai"
);

const genAI =
    new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
    );

const model =
    genAI.getGenerativeModel({
        model:
            "gemini-1.5-flash",
    });

async function generateAnswer(
    prompt
) {

    try {

        const result =
            await model.generateContent(
                prompt
            );

        const response =
            await result.response;

        return response.text();

    } catch (error) {

        console.log(error);

        throw new Error(
            "Gemini Generation Failed"
        );
    }
}

module.exports =
    generateAnswer;