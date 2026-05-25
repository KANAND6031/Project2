const fs = require("fs");
const pdfParse = require("pdf-parse/lib/pdf-parse.js");

const extractPDFText = async (filePath) => {

    try {

        const dataBuffer =
            fs.readFileSync(filePath);

        const data =
            await pdfParse(dataBuffer);

        return {
            text: data.text,
            pages: data.numpages,
            info: data.info,
        };

    } catch (error) {

        console.log(error);

        throw new Error("PDF Parsing Failed");
    }
};

module.exports = extractPDFText;