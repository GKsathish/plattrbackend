const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/recipe-sharing-platform', { useNewUrlParser: true, useUnifiedTopology: true });

// Check if MongoDB is connected
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error: ', err);
});

// Import and use routes
const recipeRoutes = require('./routes/recipeRoutes');
app.use('/api', recipeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
