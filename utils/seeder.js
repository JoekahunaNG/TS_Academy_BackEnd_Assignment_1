const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Author = require('../models/Author');
const Book = require('../models/Book');
const Student = require('../models/Student');
const LibraryAttendant = require('../models/LibraryAttendant');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

const seedData = async () => {
  try {
    // 1. Clear existing data
    console.log('Clearing existing data...');
    await Author.deleteMany();
    await Book.deleteMany();
    await Student.deleteMany();
    await LibraryAttendant.deleteMany();

    // 2. Create Authors
    console.log('Seeding Authors...');
    const authors = await Author.insertMany([
      { name: 'J.R.R. Tolkien', bio: 'Creator of Middle-earth' },
      { name: 'George R.R. Martin', bio: 'Author of A Song of Ice and Fire' },
      { name: 'F. Scott Fitzgerald', bio: 'American novelist and short story writer' }
    ]);

    // 3. Create Students
    console.log('Seeding Students...');
    const students = await Student.insertMany([
      { name: 'John Doe', email: 'john@example.com', studentId: 'STU001' },
      { name: 'Jane Smith', email: 'jane@example.com', studentId: 'STU002' }
    ]);

    // 4. Create Attendants
    console.log('Seeding Attendants...');
    const attendants = await LibraryAttendant.insertMany([
      { name: 'Alice Staff', staffId: 'STAFF101' },
      { name: 'Bob Admin', staffId: 'STAFF102' }
    ]);

    // 5. Create Books
    console.log('Seeding Books...');
    
    // Available Book
    await Book.create({
      title: 'The Hobbit',
      isbn: '9780547928227',
      authors: [authors[0]._id],
      status: 'IN'
    });

    // Another Available Book
    await Book.create({
      title: 'The Great Gatsby',
      isbn: '9780684801520',
      authors: [authors[2]._id],
      status: 'IN'
    });

    // Borrowed Book (Normal)
    await Book.create({
      title: 'A Game of Thrones',
      isbn: '9780553103540',
      authors: [authors[1]._id],
      status: 'OUT',
      borrowedBy: students[0]._id,
      issuedBy: attendants[0]._id,
      returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    });

    // Overdue Book
    await Book.create({
      title: 'The Silmarillion',
      isbn: '9780261102736',
      authors: [authors[0]._id],
      status: 'OUT',
      borrowedBy: students[1]._id,
      issuedBy: attendants[1]._id,
      returnDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago (Overdue!)
    });

    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
