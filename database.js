
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./clinicq.db", (err) => {
    if (err) {
        console.log("Database connection failed:", err.message);
    } else {
        console.log("Connected to ClinicQ Database");
    }
});

db.serialize(() => {
    db.run("PRAGMA foreign_keys = ON");

    // Doctors table
    db.run(`
        CREATE TABLE IF NOT EXISTS doctors (
            doctor_id INTEGER PRIMARY KEY AUTOINCREMENT,
            doctor_name TEXT NOT NULL,
            specialization TEXT NOT NULL
        )
    `);

    // Rooms table
    db.run(`
        CREATE TABLE IF NOT EXISTS rooms (
            room_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            floor INTEGER NOT NULL
        )
    `);

    // Bookings table
    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
            booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
            doctor_id INTEGER NOT NULL,
            room_id INTEGER NOT NULL,
            start_date TEXT NOT NULL,
            end_date TEXT NOT NULL,
            FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id),
            FOREIGN KEY (room_id) REFERENCES rooms(room_id),
            CHECK (end_date >= start_date)
        )
    `);

    console.log("All three tables created successfully");
});

module.exports = db;
