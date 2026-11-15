
-- Insert Doctors
INSERT INTO doctors (name, specialization, phone)
VALUES
('Dr. Rahul Sharma', 'Cardiology', '9876543210'),
('Dr. Priya Reddy', 'Dermatology', '9876543211'),
('Dr. Arjun Kumar', 'General Medicine', '9876543212');

-- Insert Consultation Rooms
INSERT INTO rooms (name, floor, status)
VALUES
('Room 1', 1, 'Available'),
('Room 2', 1, 'Available'),
('Room 3', 2, 'Available'),
('Room 4', 2, 'Available'),
('Room 5', 3, 'Available');

-- Insert Sample Bookings
INSERT INTO bookings (doctor_id, room_id, start_date, end_date)
VALUES
(1, 1, '2026-11-10', '2026-11-12'),
(2, 2, '2026-11-11', '2026-11-13'),
(3, 3, '2026-11-15', '2026-11-17');
