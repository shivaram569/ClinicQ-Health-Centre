
const fs = require("fs");
const path = require("path");
const db = require("./database");

// Read seed SQL file
const seedPath = path.join(__dirname, "seed.sql");
const seedData = fs.readFileSync(seedPath, "utf8");

// Insert sample records
db.exec(seedData, (err) => {
    if (err) {
        console.error("Error inserting seed data:", err.message);
    } else {
        console.log("Seed data inserted successfully!");
        console.log("Doctors, Rooms and Bookings sample records added.");
    }

    db.close();
});
