
const express = require("express");

const router = express.Router();

// Import REST endpoints
const restEndpoints = require("../CONTRIBUTION_3_REST_ENDPOINTS/endpoints");

// Import Room Availability routes
const availabilityRoutes = require("../CONTRIBUTION_5_TWIST_RULE/availability");

// Home route
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to ClinicQ Health Centre API"
    });
});

// API health check route
router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ClinicQ API is running"
    });
});

// Register Room Availability API first
router.use("/", availabilityRoutes);

// Register REST API endpoints
router.use("/", restEndpoints);

module.exports = router;
