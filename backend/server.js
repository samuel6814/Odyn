// in backend/server.js

// Import the Express library
const express = require('express');
// Import mongoose
const mongoose = require('mongoose');
// 1. Import the cors middleware
const cors = require('cors');
// Import and configure dotenv
require('dotenv').config();

// Create an instance of an Express application
const app = express();

// Define the port the server will run on.
const PORT = process.env.PORT || 3001;

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

connectDB();
// -------------------------

// --- Middleware ---
// 2. Add cors middleware to allow cross-origin requests
app.use(cors());
// This middleware parses incoming JSON requests
app.use(express.json());
// -------------------------


// --- Define Routes ---
// 3. Removed the duplicated route definition
app.use('/api/auth', require('./routes/auth'));
// --------------------

//This line I added here is for the dashboard route
app.use('/api/dashboard', require('./routes/dashboard'));

//This line here I have added is for the lessons page
app.use('/api/lessons', require('./routes/lessons'));

//Tracking Progress-I am soo tired rn- hahaha, I am groot, yeah i know its not funny
app.use('/api/progress', require('./routes/progress'));



// Define a basic route for the root URL
app.get('/api', (req, res) => {
  res.json({ message: "Welcome to the Odyn API. The path is clear." });
});

// Start the server and listen for incoming connections
app.listen(PORT, () => {
  console.log(`Odyn backend server is listening on port ${PORT}`);
});