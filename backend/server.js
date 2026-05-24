const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const testRoutes = require("./routes/testRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

connectDB();

app.use(cors({
    origin: "*",
}));

app.use(express.json());

app.use("/api", testRoutes);
app.use("/api", uploadRoutes);

app.get("/", (req, res) => {
    res.send("OpsMind AI Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});