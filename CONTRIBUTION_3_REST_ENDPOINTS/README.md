# Contribution 3 – REST Endpoints

## 1. Overview

This contribution focuses on developing REST API endpoints for the ClinicQ Health Centre Consultation Room Management System.

The endpoints allow users to manage doctors, consultation rooms and bookings using HTTP methods such as GET, POST, PUT and DELETE.

## 2. Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- SQL

## 3. File Created

### endpoints.js

This file contains the REST API endpoint implementations for the ClinicQ application.

It connects API requests with the SQLite database and performs the required database operations.

## 4. Doctor Management APIs

The following endpoints are implemented to manage doctor records.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/doctors` | Retrieve all doctors |
| GET | `/doctors/:doctorId` | Retrieve a doctor by ID |
| POST | `/doctors` | Add a new doctor |
| PUT | `/doctors/:doctorId` | Update doctor details |
| DELETE | `/doctors/:doctorId` | Delete a doctor |

## 5. Room Management APIs

The following endpoints are implemented to manage consultation rooms.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/rooms` | Retrieve all rooms |
| GET | `/rooms/:roomId` | Retrieve a room by ID |
| POST | `/rooms` | Add a new room |
| PUT | `/rooms/:roomId` | Update room details |
| DELETE | `/rooms/:roomId` | Delete a room |

## 6. Booking Management APIs

The following endpoints are implemented to manage bookings.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/bookings` | Retrieve all bookings |
| GET | `/bookings/:bookingId` | Retrieve a booking by ID |
| POST | `/bookings` | Create a new booking |
| PUT | `/bookings/:bookingId` | Update booking details |
| DELETE | `/bookings/:bookingId` | Delete a booking |

## 7. Booking Details API

**Endpoint:** `GET /booking-details`

This endpoint uses SQL JOIN operations to retrieve booking information along with the corresponding doctor and consultation room details.

It combines information from the doctors, rooms and bookings tables.

## 8. Database Operations

The endpoints use SQLite queries to perform database operations.

- SELECT retrieves records.
- INSERT adds new records.
- UPDATE modifies existing records.
- DELETE removes records.

Parameterized SQL queries are used to pass values safely into database operations.

## 9. Input Validation

The REST endpoints are connected with validation middleware to check the input data before performing database operations.

This helps prevent invalid doctor, room and booking information from being submitted.

## 10. Conclusion

This contribution implements the main REST API functionality of ClinicQ. It allows the application to manage doctors, consultation rooms and bookings through structured HTTP requests and SQLite database operations.