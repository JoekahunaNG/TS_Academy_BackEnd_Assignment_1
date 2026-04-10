# School Library Management API

A RESTful API for a School Library System built with Node.js, Express, and MongoDB.

## Features
- **Authors**: Create, Read, Update, Delete.
- **Books**: Manage library books, track status (IN/OUT), and link multiple authors.
- **Students**: Manage student records.
- **Attendants**: Manage library staff who issue books.
- **Borrow/Return Logic**: Robust system for issuing and returning books.
- **Bonus Features**:
  - Pagination and Search for books.
  - Request validation using Joi.
  - Centralized Error Handling.
  - Simple JWT authentication for staff.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Validation**: Joi
- **Logging**: Morgan
- **Security**: JWT, CORS

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed locally or a MongoDB Atlas URI

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/school-library
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```

4. Run the application:
   - For development: `npm run dev`
   - For production: `npm start`

## Interactive API Documentation (Swagger)

For an interactive experience where you can test the API directly from your browser, use the Swagger UI:

1. Start the server (`npm run dev`).
2. Navigate to: **`http://localhost:5000/api-docs`**
3. Use the **"Try it out"** button on any endpoint to send live requests.
4. View detailed **Schemas** at the bottom of the page to understand the data models.

## API Documentation

### 1. Authors
- `POST /authors` - Create author
- `GET /authors` - Get all authors
- `GET /authors/:id` - Get single author
- `PUT /authors/:id` - Update author
- `DELETE /authors/:id` - Delete author

### 2. Books
- `POST /books` - Create book
- `GET /books` - Get all books (Supports `?page=1&limit=10&search=Title`)
- `GET /books/:id` - Get single book (Populates authors, student, and attendant)
- `PUT /books/:id` - Update book
- `DELETE /books/:id` - Delete book
- `GET /books/overdue` - Get all books past their return date
- `POST /books/:id/borrow` - Borrow a book
  - Body: `{ "studentId": "...", "attendantId": "...", "returnDate": "2026-04-01" }`
- `POST /books/:id/return` - Return a book

### 3. Students
- `POST /students` - Create student
- `GET /students` - Get all students
- `GET /students/:id` - Get single student

### 4. Library Attendants
- `POST /attendants` - Create attendant (Returns JWT token)
- `GET /attendants` - Get all attendants

## Borrowing & Returning Rules
- A book can only be borrowed if its status is **"IN"**.
- A book can only be returned if its status is **"OUT"**.
- Borrowing updates the status to **"OUT"** and sets the `borrowedBy`, `issuedBy`, and `returnDate` fields.
- Returning resets the status to **"IN"** and clears all borrowing fields.
