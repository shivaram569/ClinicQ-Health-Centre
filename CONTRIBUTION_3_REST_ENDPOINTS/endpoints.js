const express = require("express");
const db = require("../CONTRIBUTION_2_DATABASE/database");
const {
    validateDoctor,
    validateRoom,
    validateBooking
} = require("../CONTRIBUTION_4_VALIDATION_AND_SEARCH/validation");

const router = express.Router();

// =====================================
// DOCTORS CRUD OPERATIONS
// =====================================

// 1. Get all doctors
router.get("/doctors", (req, res) => {
    const sql = "SELECT * FROM doctors";

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve doctors"
            });
        }

        res.status(200).json({
            success: true,
            count: rows.length,
            doctors: rows
        });
    });
});
// 2. Add a new doctor
router.post("/doctors", validateDoctor, (req, res) => {
    const { name, specialization, phone } = req.body;

    const sql = `
        INSERT INTO doctors (name, specialization, phone)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [name, specialization, phone], function (err) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to add doctor",
                error: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Doctor added successfully",
            doctorId: this.lastID
        });
    });
});
// 3. Get a doctor by ID
router.get("/doctors/:doctorId", (req, res) => {
    const { doctorId } = req.params;

    const sql = "SELECT * FROM doctors WHERE doctor_id = ?";

    db.get(sql, [doctorId], (err, row) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve doctor",
                error: err.message
            });
        }

        if (!row) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            success: true,
            doctor: row
        });
    });
});
// 4. Update doctor details
router.put("/doctors/:doctorId", validateDoctor, (req, res) => {
    const { doctorId } = req.params;
    const { name, specialization, phone } = req.body;

    const sql = `
        UPDATE doctors
        SET name = ?, specialization = ?, phone = ?
        WHERE doctor_id = ?
    `;

    db.run(sql, [name, specialization, phone, doctorId], function (err) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to update doctor",
                error: err.message
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor updated successfully"
        });
    });
});
// 5. Delete a doctor
router.delete("/doctors/:doctorId", (req, res) => {
    const { doctorId } = req.params;

    const sql = "DELETE FROM doctors WHERE doctor_id = ?";

    db.run(sql, [doctorId], function (err) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to delete doctor",
                error: err.message
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor deleted successfully"
        });
    });
});
// =====================================
// ROOMS CRUD OPERATIONS
// =====================================

// 1. Get all rooms

router.get("/rooms", (req, res) => {
    const { floor } = req.query;

    let sql = "SELECT * FROM rooms";
    let params = [];

    // Search rooms by floor if floor is provided
    if (floor !== undefined) {
        if (!Number.isInteger(Number(floor)) || Number(floor) < 1) {
            return res.status(400).json({
                success: false,
                message: "Floor must be a positive integer"
            });
        }

        sql += " WHERE floor = ?";
        params.push(Number(floor));
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve rooms",
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: rows.length,
            rooms: rows
        });
    });
});

// 2. Add a new room
router.post("/rooms", validateRoom, (req, res) => {
    const { name, floor, status } = req.body;

    const sql = `
        INSERT INTO rooms (name, floor, status)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [name, floor, status || "Available"], function (err) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to add room",
                error: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Room added successfully",
            roomId: this.lastID
        });
    });
});
// 3. Get a room by ID
router.get("/rooms/:roomId", (req, res) => {
    const { roomId } = req.params;

    const sql = "SELECT * FROM rooms WHERE room_id = ?";

    db.get(sql, [roomId], (err, row) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve room",
                error: err.message
            });
        }

        if (!row) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        res.status(200).json({
            success: true,
            room: row
        });
    });
});
// 4. Update room details
router.put("/rooms/:roomId", validateRoom, (req, res) => {
    const { roomId } = req.params;
    const { name, floor, status } = req.body;

    const sql = `
        UPDATE rooms
        SET name = ?, floor = ?, status = ?
        WHERE room_id = ?
    `;

    db.run(sql, [name, floor, status, roomId], function (err) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to update room",
                error: err.message
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Room updated successfully"
        });
    });
});
// 5. Delete a room
router.delete("/rooms/:roomId", (req, res) => {
    const { roomId } = req.params;

    const sql = "DELETE FROM rooms WHERE room_id = ?";

    db.run(sql, [roomId], function (err) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to delete room",
                error: err.message
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Room deleted successfully"
        });
    });
});
// =====================================
// BOOKINGS CRUD OPERATIONS
// =====================================

// 1. Get all bookings
router.get("/bookings", (req, res) => {
    const sql = "SELECT * FROM bookings";

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve bookings",
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: rows.length,
            bookings: rows
        });
    });
});
// 2. Create a new booking

router.post("/bookings", validateBooking, (req, res) => {
    const { doctor_id, room_id, start_date, end_date } = req.body;

    // Check for overlapping bookings in the same room
    const checkSql = `
        SELECT * FROM bookings
        WHERE room_id = ?
        AND start_date <= ?
        AND end_date >= ?
    `;

    db.get(
        checkSql,
        [room_id, end_date, start_date],
        (err, booking) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to check room availability",
                    error: err.message
                });
            }

            // Reject booking if an overlap exists
            if (booking) {
                return res.status(409).json({
                    success: false,
                    message: "Room is already booked for the selected dates"
                });
            }

            // Insert booking if no conflict exists
            const sql = `
                INSERT INTO bookings (doctor_id, room_id, start_date, end_date)
                VALUES (?, ?, ?, ?)
            `;

            db.run(
                sql,
                [doctor_id, room_id, start_date, end_date],
                function (err) {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Failed to create booking",
                            error: err.message
                        });
                    }

                    res.status(201).json({
                        success: true,
                        message: "Booking created successfully",
                        bookingId: this.lastID
                    });
                }
            );
        }
    );
});

// 3. Get a booking by ID
router.get("/bookings/:bookingId", (req, res) => {
    const { bookingId } = req.params;

    const sql = "SELECT * FROM bookings WHERE booking_id = ?";

    db.get(sql, [bookingId], (err, row) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve booking",
                error: err.message
            });
        }

        if (!row) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.status(200).json({
            success: true,
            booking: row
        });
    });
});
// 4. Update booking details

router.put("/bookings/:bookingId", validateBooking, (req, res) => {
    const { bookingId } = req.params;
    const { doctor_id, room_id, start_date, end_date } = req.body;

    // Check for overlapping bookings, excluding the current booking
    const checkSql = `
        SELECT * FROM bookings
        WHERE room_id = ?
        AND start_date <= ?
        AND end_date >= ?
        AND booking_id != ?
    `;

    db.get(
        checkSql,
        [room_id, end_date, start_date, bookingId],
        (err, booking) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to check room availability",
                    error: err.message
                });
            }

            if (booking) {
                return res.status(409).json({
                    success: false,
                    message: "Room is already booked for the selected dates"
                });
            }

            const sql = `
                UPDATE bookings
                SET doctor_id = ?, room_id = ?, start_date = ?, end_date = ?
                WHERE booking_id = ?
            `;

            db.run(
                sql,
                [doctor_id, room_id, start_date, end_date, bookingId],
                function (err) {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Failed to update booking",
                            error: err.message
                        });
                    }

                    if (this.changes === 0) {
                        return res.status(404).json({
                            success: false,
                            message: "Booking not found"
                        });
                    }

                    res.status(200).json({
                        success: true,
                        message: "Booking updated successfully"
                    });
                }
            );
        }
    );
});

// 5. Delete a booking
router.delete("/bookings/:bookingId", (req, res) => {
    const { bookingId } = req.params;

    const sql = "DELETE FROM bookings WHERE booking_id = ?";

    db.run(sql, [bookingId], function (err) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to delete booking",
                error: err.message
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Booking deleted successfully"
        });
    });
});
// =====================================
// BOOKING DETAILS USING SQL JOIN
// =====================================

// Get booking details with doctor and room information
router.get("/booking-details", (req, res) => {
    const sql = `
        SELECT
            b.booking_id,
            d.name AS doctor_name,
            d.specialization,
            r.name AS room_name,
            r.floor,
            b.start_date,
            b.end_date
        FROM bookings b
        JOIN doctors d ON b.doctor_id = d.doctor_id
        JOIN rooms r ON b.room_id = r.room_id
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve booking details",
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: rows.length,
            bookingDetails: rows
        });
    });
});
module.exports = router;