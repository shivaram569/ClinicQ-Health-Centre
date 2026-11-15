# Contribution 4 – Validation and Search

## 1. Overview

This contribution focuses on implementing input validation and room search functionality for the ClinicQ Health Centre Consultation Room Management System.

It ensures that the information submitted through API requests is checked before processing and allows users to search consultation rooms based on their floor number.

## 2. Technologies Used

- Node.js
- Express.js
- JavaScript
- SQLite

## 3. File Created

### validation.js

This file contains validation middleware functions used to check doctor, room and booking information.

The validation middleware checks incoming request data and returns appropriate error responses when invalid information is provided.

## 4. Doctor Validation

The doctor validation function checks:

- Doctor name is provided.
- Specialization is provided.
- Phone number is provided.
- Phone number contains exactly 10 digits.

If the input is invalid, the application returns HTTP 400 Bad Request.

## 5. Room Validation

The room validation function checks:

- Room name is provided.
- Floor number is provided.
- Floor number must be a positive integer.
- Room status must be one of the accepted values: Available, Occupied or Unavailable.

Invalid room information is rejected with an appropriate error message.

## 6. Booking Validation

The booking validation function checks:

- Doctor ID is provided.
- Room ID is provided.
- Start date is provided.
- End date is provided.
- Dates follow the YYYY-MM-DD format.
- End date cannot be earlier than start date.

Invalid booking information returns HTTP 400 Bad Request.

## 7. Room Search Functionality

The room search functionality allows users to retrieve rooms based on their floor number.

**Example endpoint:**

```text
GET /rooms?floor=2
```

This request retrieves rooms located on floor 2.

The application also checks whether the floor number is a valid positive integer.

## 8. Validation Testing

The following validation scenarios were tested using Postman:

1. Doctor information with a missing phone number.
2. Doctor information with an invalid phone number.
3. Room information with an invalid floor number.
4. Booking with an end date earlier than the start date.
5. Booking with an incorrectly formatted date.
6. Room search with an invalid floor number.

The application returns appropriate validation messages for invalid inputs.

## 9. Conclusion

This contribution improves the reliability of the ClinicQ application by validating doctor, room and booking information. The room search functionality also makes it easier to retrieve consultation rooms based on their floor number.