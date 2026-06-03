const fs = require("fs");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.mjs");

async function extractPDFText(filePath) {

    const data =
        new Uint8Array(
            fs.readFileSync(filePath)
        );

    const pdf =
        await pdfjsLib.getDocument({
            data
        }).promise;

    const pages = [];

    let fullText = "";

    for (
        let pageNum = 1;
        pageNum <= pdf.numPages;
        pageNum++
    ) {

        const page =
            await pdf.getPage(
                pageNum
            );

        const content =
            await page.getTextContent();

        const text =
            content.items
                .map(
                    item => item.str
                )
                .join(" ");

        pages.push({

            pageNumber:
                pageNum,

            text
        });

        fullText +=
            text + "\n";
    }

    return {

        text:
            fullText,

        totalPages:
            pdf.numPages,

        pages
    };
}

module.exports =
    extractPDFText;