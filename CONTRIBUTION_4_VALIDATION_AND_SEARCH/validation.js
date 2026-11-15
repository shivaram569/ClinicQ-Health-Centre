
// Validate Doctor Input
const validateDoctor = (req, res, next) => {
    const { name, specialization, phone } = req.body;

    if (!name || !specialization || !phone) {
        return res.status(400).json({
            success: false,
            message: "Name, specialization and phone are required"
        });
    }

    if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json({
            success: false,
            message: "Phone number must contain exactly 10 digits"
        });
    }

    next();
};

// Validate Room Input
const validateRoom = (req, res, next) => {
    const { name, floor, status } = req.body;

    if (!name || floor === undefined || floor === null) {
        return res.status(400).json({
            success: false,
            message: "Room name and floor are required"
        });
    }

    if (!Number.isInteger(Number(floor)) || Number(floor) < 1) {
        return res.status(400).json({
            success: false,
            message: "Floor must be a positive integer"
        });
    }

    if (status && !["Available", "Occupied", "Unavailable"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid room status"
        });
    }

    next();
};

// Validate Booking Input
const validateBooking = (req, res, next) => {
    const { doctor_id, room_id, start_date, end_date } = req.body;

    if (!doctor_id || !room_id || !start_date || !end_date) {
        return res.status(400).json({
            success: false,
            message: "Doctor ID, room ID, start date and end date are required"
        });
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(start_date) || !datePattern.test(end_date)) {
        return res.status(400).json({
            success: false,
            message: "Dates must be in YYYY-MM-DD format"
        });
    }

    if (end_date < start_date) {
        return res.status(400).json({
            success: false,
            message: "End date cannot be earlier than start date"
        });
    }

    next();
};

module.exports = {
    validateDoctor,
    validateRoom,
    validateBooking
};
