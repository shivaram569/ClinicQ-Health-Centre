# Contribution 2 – Database Management

## 1. Overview

This contribution focuses on database design and management for the ClinicQ Health Centre Consultation Room Management System.

SQLite is used to store and manage doctor information, consultation rooms and booking details. The database maintains relationships between tables using primary keys and foreign keys.

## 2. Technologies Used

- SQLite
- SQL
- Node.js
- JavaScript

## 3. Database Files

### 3.1 database.js

This file establishes the connection between the Node.js application and the SQLite database.

Main functionalities:
- Connects to the ClinicQ SQLite database.
- Provides the database connection for other modules.
- Enables foreign key support using `PRAGMA foreign_keys = ON`.

### 3.2 schema.sql

This file defines the database structure.

It contains the SQL commands to create the following tables:

- Doctors
- Rooms
- Bookings

The tables use primary keys and foreign key relationships to maintain data integrity.

### 3.3 initDatabase.js

This file initializes the SQLite database by executing the database schema.

### 3.4 seed.sql

This file contains the initial sample data used to populate the database tables.

### 3.5 seedDatabase.js

This file executes the seed SQL commands and inserts sample records into the database.

### 3.6 queries.sql

This file contains SQL queries used to retrieve and manage database information.

### 3.7 testQueries.js

This file tests database queries, including JOIN operations to retrieve booking information along with related doctor and room details.

### 3.8 viewDatabase.js

This file is used to view the records stored in the database tables.

### 3.9 clinicq.db

This is the SQLite database file that stores the application data.

## 4. Database Tables

The database contains three main tables.

| Table | Description |
|---|---|
| doctors | Stores doctor details such as name, specialization and phone number |
| rooms | Stores consultation room information, including room name, floor and status |
| bookings | Stores booking details and connects doctors with rooms |

## 5. Database Relationships

The database uses foreign keys to establish relationships.

- The `bookings` table references the `doctors` table through `doctor_id`.
- The `bookings` table references the `rooms` table through `room_id`.

These relationships help maintain consistency between booking records, doctors and rooms.

## 6. SQL JOIN Operations

JOIN queries are used to combine information from multiple tables.

The booking details query retrieves:
- Booking ID
- Doctor information
- Room information
- Booking start date
- Booking end date

This helps display complete booking information in a single result.

## 7. Database Initialization

The database can be initialized using the following commands from the project root:

```bash
node CONTRIBUTION_2_DATABASE/initDatabase.js
```

To insert the sample records:

```bash
node CONTRIBUTION_2_DATABASE/seedDatabase.js
```

To view the stored records:

```bash
node CONTRIBUTION_2_DATABASE/viewDatabase.js
```

To test the database queries:

```bash
node CONTRIBUTION_2_DATABASE/testQueries.js
```

## 8. Conclusion

This contribution provides the database foundation for the ClinicQ application. SQLite is used to store doctors, rooms and bookings. Primary keys, foreign keys, SQL queries and JOIN operations help maintain and retrieve the required information efficiently.