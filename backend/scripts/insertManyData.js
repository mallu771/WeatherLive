const mongoose = require('mongoose');
const Weather = require('../models/Weather'); // Adjust path if needed

mongoose.connect('mongodb://localhost:27017/WeatherData', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

function getRandomFloat(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

function generateWeatherData(startDate, count, intervalMinutes) {
  const data = [];
  let current = new Date(startDate);

  for (let i = 0; i < count; i++) {
    data.push({
      timestamp: new Date(current),
      temperature: getRandomFloat(20, 40), // °C
      humidity: getRandomFloat(30, 90),    // %
      pressure: getRandomFloat(990, 1025)  // hPa
    });
    current.setMinutes(current.getMinutes() + intervalMinutes);
  }

  return data;
}

const start = '2025-07-01T00:00:00Z';
const weatherData = generateWeatherData(start, 1000, 5); // 5-minute intervals

Weather.insertMany(weatherData)
  .then(() => {
    console.log('✅ 1000 weather entries inserted successfully');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error inserting data:', err);
  });
