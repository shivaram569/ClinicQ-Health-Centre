
const express = require("express");
const routes = require("./routes");

const app = express();

const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Request Logger Middleware
app.use((req, res, next) => {
    const requestTime = new Date().toLocaleString();

    console.log(`[${requestTime}] ${req.method} ${req.url}`);

    next();
});

// Register application routes
app.use("/", routes);

// 404 Not Found Middleware
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`ClinicQ server running at http://localhost:${PORT}`);
});
