
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create or connect to ClinicQ database
const dbPath = path.join(__dirname, "clinicq.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to ClinicQ SQLite database");
    }
});

// Enable foreign key constraints
db.run("PRAGMA foreign_keys = ON", (err) => {
    if (err) {
        console.error("Foreign key activation failed:", err.message);
    } else {
        console.log("Foreign keys enabled");
    }
});

module.exports = db;
