// src/components/tourist/WeatherAdvisory.jsx
import React, { useState, useEffect } from 'react';
import { FaTemperatureHigh, FaWind, FaExclamationTriangle } from 'react-icons/fa';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiFog, WiThunderstorm } from 'react-icons/wi';

const WeatherAdvisory = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    if (!location || !apiKey) {
      setIsLoading(false);
      return;
    }

    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) throw new Error('Weather data not found');
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setWeatherData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [location, apiKey]);

  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return <WiThunderstorm />;
    if (weatherId >= 300 && weatherId < 600) return <WiRain />;
    if (weatherId >= 600 && weatherId < 700) return <WiSnow />;
    if (weatherId >= 700 && weatherId < 800) return <WiFog />;
    if (weatherId === 800) return <WiDaySunny />;
    if (weatherId > 800) return <WiCloudy />;
    return <WiDaySunny />;
  };

  const getSafetyAdvisory = (weather) => {
    const mainCondition = weather?.weather[0]?.main.toLowerCase();
    const temp = weather?.main?.temp;

    if (mainCondition === 'thunderstorm') return { level: 'danger', message: 'Severe weather alert. Seek shelter immediately.' };
    if (mainCondition === 'rain' || mainCondition === 'drizzle') return { level: 'warning', message: 'High chance of landslides in hilly areas. Be cautious on roads.' };
    if (mainCondition === 'fog' || mainCondition === 'mist') return { level: 'warning', message: 'Low visibility. Drive carefully and use fog lights.' };
    if (temp > 35) return { level: 'warning', message: 'Extreme heat. Stay hydrated and avoid direct sun.' };
    return { level: 'safe', message: 'Weather conditions are favorable. Enjoy your trip!' };
  };

  if (!apiKey) {
    return (
      <div className="weather-card">
        <div className="advisory-box advisory-danger">
          <FaExclamationTriangle />
          <p>Weather API key is not configured. Please add it to your .env file.</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="weather-card"><p>Loading weather data...</p></div>;
  if (!weatherData) return <div className="weather-card"><p>Could not load weather data.</p></div>;

  const advisory = getSafetyAdvisory(weatherData);

  return (
    <div className="weather-card">
      <h4>Weather & Safety Advisory</h4>
      <div className="weather-info">
        <div className="weather-icon">{getWeatherIcon(weatherData.weather[0].id)}</div>
        <div className="weather-details">
          <p className="temperature"><FaTemperatureHigh /> {Math.round(weatherData.main.temp)}°C</p>
          <p className="condition">{weatherData.weather[0].description}</p>
          <p className="wind"><FaWind /> {weatherData.wind.speed} m/s</p>
        </div>
      </div>
      <div className={`advisory-box advisory-${advisory.level}`}>
        <FaExclamationTriangle />
        <p><strong>Advisory:</strong> {advisory.message}</p>
      </div>
    </div>
  );
};

export default WeatherAdvisory;