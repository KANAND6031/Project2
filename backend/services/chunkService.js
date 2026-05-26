const createChunks = (
    text,
    chunkSize = 800,
    overlap = 150
) => {

    const words = text.split(/\s+/);

    const chunks = [];

    let start = 0;

    let chunkIndex = 0;

    while (start < words.length) {

        const end = start + chunkSize;

        const chunkWords =
            words.slice(start, end);

        const chunkText =
            chunkWords.join(" ");

        chunks.push({

            chunkIndex,

            text: chunkText,

            wordCount:
                chunkWords.length,

            metadata: {

                startWord: start,

                endWord: end,
            },
        });

        start += chunkSize - overlap;

        chunkIndex++;
    }

    return chunks;
};

module.exports = createChunks;