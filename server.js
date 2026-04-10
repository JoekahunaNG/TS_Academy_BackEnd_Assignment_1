const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error.middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const authorRoutes = require('./routes/author.routes');
const bookRoutes = require('./routes/book.routes');
const studentRoutes = require('./routes/student.routes');
const attendantRoutes = require('./routes/attendant.routes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);
app.use('/students', studentRoutes);
app.use('/attendants', attendantRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the School Library Management API' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
