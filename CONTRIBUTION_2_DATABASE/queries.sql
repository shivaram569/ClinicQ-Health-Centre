
-- 1. Get all doctors
SELECT * FROM doctors;

-- 2. Get all rooms
SELECT * FROM rooms;

-- 3. Get all bookings
SELECT * FROM bookings;

-- 4. Get doctor details with booking information
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
JOIN rooms r ON b.room_id = r.room_id;

-- 5. Search rooms by floor
SELECT * FROM rooms
WHERE floor = 2;

-- 6. Find bookings for a particular doctor
SELECT * FROM bookings
WHERE doctor_id = 1;
