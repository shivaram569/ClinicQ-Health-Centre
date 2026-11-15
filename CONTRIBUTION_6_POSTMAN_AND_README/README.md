# ClinicQ – Health Centre Consultation Room Management System

## 1. Project Overview

ClinicQ is a backend-based Health Centre Consultation Room Management System developed using Node.js, Express.js and SQLite.

The application helps a health centre manage doctors, consultation rooms and patient bookings. It provides REST APIs to perform CRUD operations, validate user inputs, search rooms and check room availability for selected dates.

## 2. Technologies Used

- Node.js
- Express.js
- SQLite
- Postman
- JavaScript
- SQL

## 3. Contribution 6 – Postman Testing and Documentation

This contribution focuses on API testing using Postman and documenting the complete ClinicQ application.

A Postman collection named **ClinicQ Health Centre API** was created to test the available REST API endpoints.

The collection contains requests for:

- Doctor management
- Room management
- Booking management
- Booking details using SQL JOIN
- Room availability checking
- Input validation
- Room search by floor

## 4. Postman Collection

**Collection Name:** ClinicQ Health Centre API

**Collection File:** `ClinicQ_Health_Centre_API.postman_collection.json`

**Collection Format:** Postman Collection v2.1

The collection contains API requests with automated test scripts to verify response status codes, response messages and returned data.

## 5. API Testing

The following API operations were tested successfully using Postman.

### 5.1 Doctor APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/doctors` | Get all doctors |
| GET | `/doctors/:doctorId` | Get doctor by ID |
| POST | `/doctors` | Add a doctor |
| PUT | `/doctors/:doctor