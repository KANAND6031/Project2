const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"));
        }
    }
});

app.use(express.static("public"));

app.post("/upload", upload.single("pdf"), (req, res) => {
    res.send("PDF uploaded successfully!");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


# Simple chatbot skeleton

import random

# Response pairs: pattern → reply
RESPONSES = {
    "hello": "Hey there! How can I help you?",
    "hi":    "Hi! What's on your mind?",
    "how are you": "I'm just code, but I'm doing great!",
    "bye":   "Goodbye! Take care.",
    "help":  "I can answer questions or just chat.",
}

FALLBACKS = [
    "Hmm, I'm not sure about that.",
    "Could you rephrase that?",
    "Interesting — tell me more!",
    "I don't have an answer for that yet.",
]

def get_reply(user_input):
    text = user_input.lower().strip()

    for keyword, reply in RESPONSES.items():
        if keyword in text:
            return reply

    return random.choice(FALLBACKS)

def chat():
    print("Bot: Hello! Type 'bye' to quit.\n")

    while True:
        user_msg = input("You: ").strip()

        if not user_msg:
            continue

        reply = get_reply(user_msg)
        print(f"Bot: {reply}\n")

        if user_msg.lower() == "bye":
            break

if __name__ == "__main__":
    chat()
