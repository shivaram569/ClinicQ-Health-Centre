const db = require("./database");
const queries = require("./queries");

// Add sample doctor
queries.addDoctor("Dr. Rahul", "General Physician", function (err) {
    if (err) {
        console.log("Doctor error:", err.message);
        return db.close();
    }

    const doctorId = this.lastID;
    console.log("Doctor added successfully!");

    // Add sample consultation room
    queries.addRoom("Room 3", 1, function (err) {
        if (err) {
            console.log("Room error:", err.message);
            return db.close();
        }

        const roomId = this.lastID;
        console.log("Room added successfully!");

        // Add a booking from November 10 to November 12, 2026
        db.run(
            `INSERT INTO bookings
            (doctor_id, room_id, start_date, end_date)
            VALUES (?, ?, ?, ?)`,
            [doctorId, roomId, "2026-11-10", "2026-11-12"],
            function (err) {
                if (err) {
                    console.log("Booking error:", err.message);
                    return db.close();
                }

                console.log("Booking added successfully!");

                // Check room availability on November 11
                queries.getAvailableRooms("2026-11-11", function (err, rooms) {
                    if (err) {
                        console.log(err.message);
                        return db.close();
                    }

                    console.log("\nAvailable rooms on 2026-11-11:");
                    console.log(rooms);

                    // Check room availability on November 13
                    queries.getAvailableRooms("2026-11-13", function (err, rooms) {
                        if (err) {
                            console.log(err.message);
                            return db.close();
                        }

                        console.log("\nAvailable rooms on 2026-11-13:");
                        console.log(rooms);

                        // Display bookings with doctor and room details
                        queries.getBookingsWithDetails(function (err, bookings) {
                            if (err) {
                                console.log(err.message);
                            } else {
                                console.log("\nBooking details:");
                                console.log(bookings);
                            }

                            db.close();
                        });
                    });
                });
            }
        );
    });
});