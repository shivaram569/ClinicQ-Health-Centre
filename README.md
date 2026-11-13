# ClinicQ – Health Centre Consultation Room Management System

## 1. Project Overview

ClinicQ is a backend-based consultation room management system developed using Node.js, Express.js, and SQLite.

The application helps a health centre manage doctors, consultation rooms, and bookings. It also checks room availability for a selected date to prevent overlapping bookings.

## 2. Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- Thunder Client (API Testing)
- Git and GitHub

## 3. Project Features

- Add and retrieve doctor details.
- Add, view, update, and delete consultation rooms.
- Search consultation rooms by floor number.
- Retrieve individual room details using room ID.
- Create and retrieve booking details.
- Display bookings with doctor and room names using SQL JOIN.
- Check available rooms for a selected date.
- Validate date formats and booking date ranges.
- Prevent overlapping bookings for the same room.
- Return appropriate HTTP status codes for successful and unsuccessful requests.

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

Foreign key constraints are enabled to maintain relationships between the tables. The booking table also validates that the end date is not earlier than the start date.

## 5. Installation and Setup

### Step 1: Clone the repository

```bash
git clone https://github.com/shivaram569/ClinicQ-Health-Centre.git
```

### Step 2: Open the project folder

```bash
cd ClinicQ-Health-Centre
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
| GET | `/` | Display welcome message |
| GET | `/doctors` | Retrieve all doctors |
| POST | `/doctors` | Add a new doctor |
| GET | `/rooms` | Retrieve all rooms |
| GET | `/rooms?floor=2` | Retrieve rooms by floor |
| GET | `/rooms/:roomId` | Retrieve a room by ID |
| POST | `/rooms` | Add a new room |
| PUT | `/rooms/:roomId` | Update room details |
| DELETE | `/rooms/:roomId` | Delete a room |
| GET | `/rooms/available?date=YYYY-MM-DD` | Find available rooms |
| GET | `/bookings` | Retrieve bookings with doctor and room details |
| POST | `/bookings` | Create a new booking |

## 7. Special Feature – Room Availability Checker

One of the main features of ClinicQ is checking whether a consultation room is available on a selected date.

The system checks the booking start date and end date. If the requested date falls within an existing booking period, including both the start and end dates, the room is considered unavailable.

**Example:**

- If Room 3 is booked from 2026-11-20 to 2026-11-22, it is unavailable on November 20, 21, and 22.
- It can be available on November 23 if no other booking exists.

**API Example:**

```http
GET /rooms/available?date=2026-11-23
```

The system also performs booking validation:

- Invalid date formats return HTTP 400 Bad Request.
- An end date earlier than the start date returns HTTP 400 Bad Request.
- Overlapping bookings for the same room return HTTP 409 Conflict.
- Successful booking creation returns HTTP 201 Created.

## 8. Testing

The database operations can be tested using:

```bash
node testDatabase.js
```

The REST API endpoints are tested using the Thunder Client extension in Visual Studio Code.

The Thunder Client collection is included in the project repository:

`thunder-collection_ClinicQ Health Centre API.json`

It contains requests for testing doctor operations, room operations, bookings, room availability, invalid booking dates, and booking conflicts.

## 9. Conclusion

ClinicQ provides a simple backend solution for managing consultation rooms and bookings in a health centre.

The project demonstrates the practical use of Node.js, Express.js, SQLite, REST API development, database relationships, SQL JOIN queries, CRUD operations, and date validation.

It helps manage consultation room bookings efficiently and prevents scheduling conflicts.