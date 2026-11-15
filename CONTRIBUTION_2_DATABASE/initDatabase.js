
const fs = require("fs");
const path = require("path");
const db = require("./database");

// Read the SQL schema file
const schemaPath = path.join(__dirname, "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

// Execute the schema
db.exec(schema, (err) => {
    if (err) {
        console.error("Error creating tables:", err.message);
    } else {
        console.log("Database tables created successfully!");
        console.log("Doctors, Rooms and Bookings tables are ready.");
    }

    db.close();
});
