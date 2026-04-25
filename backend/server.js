const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

console.log("MONGO:", process.env.MONGO_URL);

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// server run
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));