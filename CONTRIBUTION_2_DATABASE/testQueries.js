
const db = require("./database");

// JOIN query to get booking details with doctor and room names
const joinQuery = `
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

db.all(joinQuery, [], (err, rows) => {
    if (err) {
        console.error("Query failed:", err.message);
    } else {
        console.log("\nBOOKING DETAILS WITH DOCTOR AND ROOM:");
        console.table(rows);
    }

    db.close();
});
