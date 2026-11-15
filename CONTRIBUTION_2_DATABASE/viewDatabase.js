
const db = require("./database");

// Display all doctors
db.all("SELECT * FROM doctors", (err, doctors) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("\nDOCTORS:");
        console.table(doctors);
    }

    // Display all rooms
    db.all("SELECT * FROM rooms", (err, rooms) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("\nROOMS:");
            console.table(rooms);
        }

        // Display all bookings
        db.all("SELECT * FROM bookings", (err, bookings) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("\nBOOKINGS:");
                console.table(bookings);
            }

            db.close();
        });
    });
});
