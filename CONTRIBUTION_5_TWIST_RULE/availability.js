
const express = require("express");
const db = require("../CONTRIBUTION_2_DATABASE/database");

const router = express.Router();

// GET /rooms/available?date=YYYY-MM-DD
router.get("/rooms/available", (req, res) => {
    const { date } = req.query;

    // Check whether date is provided
    if (!date) {
        return res.status(400).json({
            success: false,
            message: "Date is required"
        });
    }

    // Validate date format
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(date)) {
        return res.status(400).json({
            success: false,
            message: "Date must be in YYYY-MM-DD format"
        });
    }

    // Find rooms that have no booking on the selected date
    const sql = `
        SELECT *
        FROM rooms r
        WHERE NOT EXISTS (
            SELECT 1
            FROM bookings b
            WHERE b.room_id = r.room_id
            AND b.start_date <= ?
            AND b.end_date >= ?
        )
    `;

    db.all(sql, [date, date], (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve available rooms",
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            date: date,
            count: rows.length,
            availableRooms: rows
        });
    });
});

module.exports = router;
