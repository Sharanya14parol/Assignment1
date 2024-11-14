
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const violationRoutes = require('./routes/violationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

app.use(bodyParser.json());
app.use('/api/violations', violationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
