const { pipeline } =
    require("@xenova/transformers");

let extractor;

const loadModel = async () => {

    if (!extractor) {

        extractor = await pipeline(
            "feature-extraction",
            "Xenova/all-MiniLM-L6-v2"
        );
    }

    return extractor;
};


const generateEmbedding = async (text) => {

    try {

        const extractor =
            await loadModel();

        const output =
            await extractor(text, {
                pooling: "mean",
                normalize: true,
            });

        return Array.from(output.data);

    } catch (error) {

        console.log(error);

        throw new Error(
            "Embedding Generation Failed"
        );
    }
};

module.exports = generateEmbedding;