
const db = require("./database");

// 1. Add a doctor
function addDoctor(doctorName, specialization, callback) {
    const sql = `
        INSERT INTO doctors (doctor_name, specialization)
        VALUES (?, ?)
    `;

    db.run(sql, [doctorName, specialization], callback);
}

// 2. Add a room
function addRoom(name, floor, callback) {
    const sql = `
        INSERT INTO rooms (name, floor)
        VALUES (?, ?)
    `;

    db.run(sql, [name, floor], callback);
}

// 3. Get all rooms
function getAllRooms(callback) {
    db.all("SELECT * FROM rooms", [], callback);
}

// 4. Get rooms by floor
function getRoomsByFloor(floor, callback) {
    const sql = "SELECT * FROM rooms WHERE floor = ?";

    db.all(sql, [floor], callback);
}

// 5. Get a room by ID
function getRoomById(roomId, callback) {
    const sql = "SELECT * FROM rooms WHERE room_id = ?";

    db.get(sql, [roomId], callback);
}

// 6. Update a room
function updateRoom(roomId, name, floor, callback) {
    const sql = `
        UPDATE rooms
        SET name = ?, floor = ?
        WHERE room_id = ?
    `;

    db.run(sql, [name, floor, roomId], callback);
}

// 7. Delete a room
function deleteRoom(roomId, callback) {
    const sql = "DELETE FROM rooms WHERE room_id = ?";

    db.run(sql, [roomId], callback);
}

// 8. Get bookings with doctor and room names
function getBookingsWithDetails(callback) {
    const sql = `
        SELECT
            bookings.booking_id,
            doctors.doctor_name,
            rooms.name AS room_name,
            bookings.start_date,
            bookings.end_date
        FROM bookings
        JOIN doctors
            ON bookings.doctor_id = doctors.doctor_id
        JOIN rooms
            ON bookings.room_id = rooms.room_id
    `;

    db.all(sql, [], callback);
}

// 9. Get rooms available on a particular date
function getAvailableRooms(date, callback) {
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

    db.all(sql, [date, date], callback);
}

module.exports = {
    addDoctor,
    addRoom,
    getAllRooms,
    getRoomsByFloor,
    getRoomById,
    updateRoom,
    deleteRoom,
    getBookingsWithDetails,
    getAvailableRooms
};
