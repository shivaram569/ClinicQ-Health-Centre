# ClinicQ – Health Centre Consultation Room Management System

## 1. Project Overview

ClinicQ is a backend-based consultation room management system developed using Node.js, Express.js, and SQLite.

The application helps a health centre manage doctors, consultation rooms, and bookings. It also checks room availability for a selected date to prevent overlapping bookings.

## 2. Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- Postman

## 3. Project Features

- Add and retrieve doctor details.
- Add, view, update, and delete consultation rooms.
- Search consultation rooms by floor number.
- Create and retrieve booking details.
- Display bookings with doctor and room names using SQL JOIN.
- Check available rooms for a selected date.
- Validate date formats and booking date ranges.
- Prevent overlapping bookings for the same room.

## 4. Database Design

The project uses an SQLite database named `clinicq.db`.

It contains three tables:

### Doctors

| Column | Description |
|---|---|
| doctor_id | Primary key |
| doctor_name | Doctor's name |
| specialization | Medical specialization |

### Rooms

| Column | Description |
|---|---|
| room_id | Primary key |
| name | Consultation room name |
| floor | Floor number |

### Bookings

| Column | Description |
|---|---|
| booking_id | Primary key |
| doctor_id | Foreign key referencing doctors |
| room_id | Foreign key referencing rooms |
| start_date | Booking start date |
| end_date | Booking end date |

## 5. Installation and Setup

### Step 1: Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2: Open the project folder

```bash
cd ClinicQ
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Initialize the database

```bash
node database.js
```

### Step 5: Start the server

```bash
node app.js
```

The server runs at:

`http://localhost:3000`

## 6. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | / | Welcome message |
| GET | /doctors | Retrieve all doctors |
| POST | /doctors | Add a doctor |
| GET | /rooms | Retrieve all rooms |
| POST | /rooms | Add a room |
| GET | /rooms/:roomId | Retrieve a room |
| PUT | /rooms/:roomId | Update a room |
| DELETE | /rooms/:roomId | Delete a room |
| GET | /rooms/available?date=YYYY-MM-DD | Find available rooms |
| GET | /bookings | Retrieve bookings with doctor and room details |
| POST | /bookings | Create a booking |

## 7. Special Feature – Free on This Date

The system checks whether a consultation room is already booked for a requested date.

A room is unavailable when the requested date falls between its booking start date and end date, including both dates.

Example:

- Room 3 is booked from 2026-11-10 to 2026-11-12.
- On 2026-11-11, Room 3 is unavailable.
- On 2026-11-13, Room 3 is available.

API example:

`GET /rooms/available?date=2026-11-13`

The system also validates booking dates. If the end date is before the start date, it returns HTTP 400.

If a room already has an overlapping booking, the API returns HTTP 409.

## 8. Testing

The database operations are tested using:

```bash
node testDatabase.js
```

The REST API endpoints can be tested using Postman.

## 9. Conclusion

ClinicQ provides a simple backend solution for managing consultation rooms and bookings in a health centre. It uses relational database concepts, REST API operations, SQL JOIN queries, and date validation to manage room availability efficiently.