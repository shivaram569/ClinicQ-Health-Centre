# Contribution 1 – Server and Routes

## 1. Overview

This contribution focuses on setting up the backend server and designing the routing architecture for the ClinicQ Health Centre Consultation Room Management System.

The application uses Node.js and Express.js to handle incoming HTTP requests and connect different API routes.

## 2. Technologies Used

- Node.js
- Express.js
- JavaScript

## 3. Files Created

### 3.1 server.js

This file is responsible for starting the Express server.

Main functionalities:

- Creates an Express application.
- Enables JSON request body parsing.
- Logs incoming HTTP requests.
- Connects the main router.
- Handles undefined routes using a 404 response.
- Provides centralized error handling.
- Starts the server on port 3000.

### 3.2 routes.js

This file manages the API routing architecture.

Main functionalities:

- Creates an Express Router.
- Defines the home route.
- Defines the health-check route.
- Connects the REST endpoint routes.
- Connects the room availability routes.
- Exports the router for use in server.js.

## 4. Server Configuration

The application runs on:

```text
http://localhost:3000
```

The server supports JSON request and response handling.

## 5. Important Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Displays the welcome message |
| GET | `/health` | Checks server health |
| Other API routes | `/doctors`, `/rooms`, `/bookings` | Connects to the respective API operations |

## 6. Error Handling

The server includes:

- Request logging middleware.
- A 404 handler for undefined routes.
- Centralized error-handling middleware.

These features help manage requests and errors effectively.

## 7. Conclusion

This contribution establishes the backend server and routing structure for ClinicQ. It provides the foundation required for database operations, REST APIs, validation and room availability functionality.