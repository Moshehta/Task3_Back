const express = require('express');
const request = require('request'); 
const app = express();
const apiKey = '7f97e74ef23b418c97a155211230503'; 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/home.html'); 
});

app.get('/getCapital', async (req, res) => {
  const countryName = req.query.countryName || '';  

  if (!countryName) {
    return res.send('Please enter a country name in the text box');
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${countryName}`;

  try {
    request(url, (error, response, data) => {
      if (error) {
        console.error(error);
        return res.send('Error retrieving weather data');
      }

      const weatherData = JSON.parse(data);

      if (weatherData.error) {
        console.error(weatherData.error.message);
        return res.send(weatherData.error.message);
      }

      const location = weatherData.location;
      const capital = location.name;
      const temperature = weatherData.current.temp_c;
      const latitude = location.lat;
      const longitude = location.lon;
      const region = location.region; 
      const formattedData = `The capital of ${countryName} is: ${capital} \nRegion: ${region} \nTemperature: ${temperature}°C \nLatitude: ${latitude}, Longitude: ${longitude}`;

      res.send(formattedData); 
    });
  } catch (error) {
    console.error(error);
    res.send('Error retrieving weather data');
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));