// Loads environment variables from the .env file
require('dotenv').config();

// Imports the necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Imports the route handlers
const gamesRoutes = require('./routes/games');
const userRoutes = require('./routes/user')

// Creates an instance of the Express application
const app = express();

// Use middleware to parse JSON requests
app.use(express.json());

// Middleware to log request path and method
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Define routes
app.use('/api/games', gamesRoutes);
app.use('/api/user', userRoutes);

// Connect to the MongoDB database using the MONGO_URI from the environment variables
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Start the Express app and listen for incoming requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port 4000');
        })
    })
    .catch((error) => {
        console.log(error)
    });
