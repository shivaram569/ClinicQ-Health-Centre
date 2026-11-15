# Contribution 5 – Assignment Twist Rule

## 1. Overview

This contribution implements the special assignment requirement for the ClinicQ Health Centre Consultation Room Management System.

The main functionality is to check consultation room availability for a selected date and prevent overlapping bookings for the same room.

## 2. Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- SQL

## 3. File Created

### availability.js

This file implements the room availability API using Express.js and SQLite.

It checks existing booking records to identify rooms that are available on a particular date.

## 4. Room Availability API

**Endpoint:**

```text
GET /rooms/available?date=YYYY-MM-DD
```

Example:

```text
GET /rooms/available?date=2026-11-14
```

The API performs the following operations:

- Accepts a date through the query parameter.
- Checks whether the date is provided.
- Validates the date format.
- Uses an SQL NOT EXISTS query to find rooms without overlapping bookings.
- Returns the available rooms along with the selected date and count.

## 5. Booking Conflict Prevention

The application prevents two bookings from overlapping for the same consultation room.

Before creating a booking, it checks whether another booking already exists for that room during the requested date range.

If an overlapping booking exists, the application returns:

**HTTP Status Code:** 409 Conflict

**Message:** Room is already booked for the selected dates.

## 6. Booking Update Conflict Check

The same conflict-prevention logic is applied when updating an existing booking.

The application checks for overlapping bookings while excluding the current booking ID.

This allows a booking to be updated without incorrectly treating itself as a conflicting booking.

## 7. SQL Logic

The room availability functionality uses the SQL `NOT EXISTS` condition.

The query checks whether a room has any booking satisfying the selected date condition.

A room is returned only when no overlapping booking exists for that date.

## 8. Testing

The following scenarios were tested using Postman:

1. Checking available rooms for a date with no bookings.
2. Checking available rooms for a date with existing bookings.
3. Testing booking creation with overlapping dates.
4. Testing booking updates with overlapping dates.
5. Successfully updating a booking when no conflict exists.

## 9. Conclusion

This contribution implements the special room availability and booking conflict-prevention requirements of ClinicQ. It helps avoid double booking and ensures that consultation rooms are allocated correctly.