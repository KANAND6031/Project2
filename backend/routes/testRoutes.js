const express = require("express");

const router = express.Router();

const model = require("../services/gemini");

router.get("/test-ai", async (req, res) => {
    try {
        const result = await model.generateContent(
            "Say hello from OpsMind AI"
        );

        const response = result.response.text();

        res.json({
            message: response,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "AI Error",
        });
    }
});

module.exports = router;