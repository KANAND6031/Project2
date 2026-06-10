const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB =
    require("./config/db");

const testRoutes =
    require("./routes/testRoutes");

const uploadRoutes =
    require("./routes/uploadRoutes");

const searchRoutes =
    require("./routes/searchRoutes");

const adminRoutes =
    require("./routes/adminRoutes");

const app = express();


// Connect MongoDB
connectDB();


// Middleware

app.use(
    cors({
        origin: true,
        credentials: true,
        methods: [
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ],
    })
);

app.use(express.json());


// Routes

app.use(
    "/api",
    testRoutes
);

app.use(
    "/api",
    uploadRoutes
);

app.use(
    "/api",
    searchRoutes
);

app.use(
    "/api/admin",
    adminRoutes
);


// Health Check

app.get(
    "/",
    (req, res) => {

        res.send(
            "OpsMind AI Backend Running"
        );
    }
);


// Server Start

const PORT =
    process.env.PORT || 5000;

app.listen(
    PORT,
    () => {

        console.log(
            `Server running on port ${PORT}`
        );
    }
);