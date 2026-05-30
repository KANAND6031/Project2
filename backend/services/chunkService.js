function createChunks(text) {

    const chunkSize = 1000;
    const overlap = 100;

    const chunks = [];

    let start = 0;
    let chunkIndex = 0;

    while (start < text.length) {

        const end =
            Math.min(
                start + chunkSize,
                text.length
            );

        const chunkText =
            text.slice(start, end);

        chunks.push({

            chunkIndex,

            text: chunkText,

            charCount:
                chunkText.length,

            metadata: {

                startChar:
                    start,

                endChar:
                    end,
            },
        });

        start =
            start +
            chunkSize -
            overlap;

        chunkIndex++;
    }

    return chunks;
}

module.exports =
    createChunks;