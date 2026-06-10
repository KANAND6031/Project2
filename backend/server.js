const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const testRoutes = require("./routes/testRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const adminRoutes =require("./routes/adminRoutes");

const app = express();
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

connectDB();


// VERY IMPORTANT CORS FIX
app.use(cors({
    origin: [
        "https://friendly-fortnight-4j69wqgx7ggphqqp4-5173.app.github.dev"
    ],
    methods: ["GET", "POST"],
    credentials: true,
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

const searchRoutes =
    require("./routes/searchRoutes");

app.use(
    "/api",
    searchRoutes
);

app.use(
    "/api/admin",
    adminRoutes
);