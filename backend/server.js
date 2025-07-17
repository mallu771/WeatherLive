const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const weatherRoute = require('./routes/weatherRoute');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/WeatherData')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api', weatherRoute);

app.listen(5000, () => {
  console.log('✅ Server running at http://localhost:5000');
});
