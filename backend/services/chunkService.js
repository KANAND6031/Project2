const extractSection =
require("./sectionService");

function createChunks(
    pages
) {

    const chunkSize = 1000;

    const overlap = 100;

    const chunks = [];

    let chunkIndex = 0;

    pages.forEach(
        (page) => {

            const text =
                page.text;

            let start = 0;

            while (
                start <
                text.length
            ) {

                const chunkText =
                    text.slice(
                        start,
                        start +
                        chunkSize
                    );

                chunks.push({

                    chunkIndex,

                    text:
                        chunkText,

                    charCount:
                        chunkText.length,

                    pageNumber:
                        page.pageNumber,

                    section:
                        extractSection(
                            chunkText
                        )
                });

                chunkIndex++;

                start +=
                    chunkSize -
                    overlap;
            }
        }
    );

    return chunks;
}

module.exports =
    createChunks;