
const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());

// ---------------- DATE VALIDATION ----------------

function isValidDate(date) {
    if (typeof date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return false;
    }

    const parsed = new Date(date + "T00:00:00Z");

    return !isNaN(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === date;
}

// ---------------- HOME ROUTE ----------------

app.get("/", (req, res) => {
    res.send("Welcome to ClinicQ Health Centre API");
});

// ---------------- DOCTOR ROUTES ----------------

// Get all doctors
app.get("/doctors", (req, res) => {
    db.all("SELECT * FROM doctors", [], (err, doctors) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(doctors);
    });
});

// Add a doctor
app.post("/doctors", (req, res) => {
    const { doctor_name, specialization } = req.body;

    if (
        typeof doctor_name !== "string" ||
        !doctor_name.trim() ||
        typeof specialization !== "string" ||
        !specialization.trim()
    ) {
        return res.status(400).json({
            error: "Doctor name and specialization are required"
        });
    }

    db.run(
        `INSERT INTO doctors (doctor_name, specialization)
         VALUES (?, ?)`,
        [doctor_name.trim(), specialization.trim()],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: "Doctor added successfully",
                doctor_id: this.lastID
            });
        }
    );
});

// ---------------- ROOM ROUTES ----------------

// Get available rooms on a particular date
app.get("/rooms/available", (req, res) => {
    const { date } = req.query;

    if (!date || !isValidDate(date)) {
        return res.status(400).json({
            error: "Please provide a valid date in YYYY-MM-DD format"
        });
    }

    const sql = `
        SELECT *
        FROM rooms
        WHERE room_id NOT IN (
            SELECT room_id
            FROM bookings
            WHERE start_date <= ?
            AND end_date >= ?
        )
    `;

    db.all(sql, [date, date], (err, rooms) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            date: date,
            available_rooms: rooms
        });
    });
});

// Get all rooms or search rooms by floor
app.get("/rooms", (req, res) => {
    const { floor } = req.query;

    let sql = "SELECT * FROM rooms";
    const params = [];

    if (floor !== undefined) {
        if (floor.trim() === "" ||
            !Number.isInteger(Number(floor))) {
            return res.status(400).json({
                error: "Floor must be a valid integer"
            });
        }

        sql += " WHERE floor = ?";
        params.push(Number(floor));
    }

    db.all(sql, params, (err, rooms) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rooms);
    });
});

// Get one room by ID
app.get("/rooms/:roomId", (req, res) => {
    const roomId = Number(req.params.roomId);

    if (!Number.isInteger(roomId) || roomId <= 0) {
        return res.status(400).json({
            error: "Invalid room ID"
        });
    }

    db.get(
        "SELECT * FROM rooms WHERE room_id = ?",
        [roomId],
        (err, room) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!room) {
                return res.status(404).json({
                    error: "Room not found"
                });
            }

            res.json(room);
        }
    );
});

// Add a room
app.post("/rooms", (req, res) => {
    const { name, floor } = req.body;

    if (
        typeof name !== "string" ||
        !name.trim() ||
        floor === undefined ||
        floor === null ||
        String(floor).trim() === "" ||
        !Number.isInteger(Number(floor))
    ) {
        return res.status(400).json({
            error: "Room name and a valid floor number are required"
        });
    }

    db.run(
        "INSERT INTO rooms (name, floor) VALUES (?, ?)",
        [name.trim(), Number(floor)],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: "Room added successfully",
                room_id: this.lastID
            });
        }
    );
});

// Update a room
app.put("/rooms/:roomId", (req, res) => {
    const roomId = Number(req.params.roomId);
    const { name, floor } = req.body;

    if (!Number.isInteger(roomId) || roomId <= 0) {
        return res.status(400).json({
            error: "Invalid room ID"
        });
    }

    if (
        typeof name !== "string" ||
        !name.trim() ||
        floor === undefined ||
        floor === null ||
        String(floor).trim() === "" ||
        !Number.isInteger(Number(floor))
    ) {
        return res.status(400).json({
            error: "Room name and a valid floor number are required"
        });
    }

    db.run(
        `UPDATE rooms
         SET name = ?, floor = ?
         WHERE room_id = ?`,
        [name.trim(), Number(floor), roomId],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Room not found"
                });
            }

            res.json({
                message: "Room updated successfully"
            });
        }
    );
});

// Delete a room
app.delete("/rooms/:roomId", (req, res) => {
    const roomId = Number(req.params.roomId);

    if (!Number.isInteger(roomId) || roomId <= 0) {
        return res.status(400).json({
            error: "Invalid room ID"
        });
    }

    db.run(
        "DELETE FROM rooms WHERE room_id = ?",
        [roomId],
        function (err) {
            if (err) {
                return res.status(400).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Room not found"
                });
            }

            res.json({
                message: "Room deleted successfully"
            });
        }
    );
});

// ---------------- BOOKING ROUTES ----------------

// Get all bookings with doctor and room names
app.get("/bookings", (req, res) => {
    const sql = `
        SELECT
            bookings.booking_id,
            bookings.doctor_id,
            bookings.room_id,
            doctors.doctor_name,
            doctors.specialization,
            rooms.name AS room_name,
            rooms.floor,
            bookings.start_date,
            bookings.end_date
        FROM bookings
        JOIN doctors
            ON bookings.doctor_id = doctors.doctor_id
        JOIN rooms
            ON bookings.room_id = rooms.room_id
    `;

    db.all(sql, [], (err, bookings) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(bookings);
    });
});

// Add a booking with date and availability validation
app.post("/bookings", (req, res) => {
    const { doctor_id, room_id, start_date, end_date } = req.body;

    // Validate IDs and required fields
    if (
        !Number.isInteger(Number(doctor_id)) ||
        Number(doctor_id) <= 0 ||
        !Number.isInteger(Number(room_id)) ||
        Number(room_id) <= 0 ||
        !start_date ||
        !end_date
    ) {
        return res.status(400).json({
            error: "Valid doctor ID, room ID, start date and end date are required"
        });
    }

    // Validate date format
    if (!isValidDate(start_date) || !isValidDate(end_date)) {
        return res.status(400).json({
            error: "Dates must be valid and use YYYY-MM-DD format"
        });
    }

    // End date cannot be before start date
    if (end_date < start_date) {
        return res.status(400).json({
            error: "End date cannot be before start date"
        });
    }

    // Check whether the room is already booked
    const checkSql = `
        SELECT booking_id
        FROM bookings
        WHERE room_id = ?
        AND start_date <= ?
        AND end_date >= ?
    `;

    db.get(
        checkSql,
        [Number(room_id), end_date, start_date],
        (err, booking) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (booking) {
                return res.status(409).json({
                    error: "This room is already booked for the selected dates"
                });
            }

            // Insert new booking
            db.run(
                `INSERT INTO bookings
                (doctor_id, room_id, start_date, end_date)
                VALUES (?, ?, ?, ?)`,
                [
                    Number(doctor_id),
                    Number(room_id),
                    start_date,
                    end_date
                ],
                function (err) {
                    if (err) {
                        return res.status(400).json({
                            error: err.message
                        });
                    }

                    res.status(201).json({
                        message: "Booking added successfully",
                        booking_id: this.lastID
                    });
                }
            );
        }
    );
});

// ---------------- START SERVER ----------------

app.listen(PORT, () => {
    console.log(`ClinicQ server running at http://localhost:${PORT}`);
});
