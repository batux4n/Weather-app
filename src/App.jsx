import React, { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "react-lottie";
import rainAnimation from "./assets/lottie/rain.json";
import snowAnimation from "./assets/lottie/snow.json";
import cloudyAnimation from "./assets/lottie/cloudy.json";
import sunnyAnimation from "./assets/lottie/sunny.json";
import fogAnimation from "./assets/lottie/fog.json";
import scatteredCloudsAnimation from "./assets/lottie/scattered-clouds.json";
import sleetAnimation from "./assets/lottie/sleet.json";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState("sunny");

  // Hava durumu değiştiğinde arka planı değiştir
  useEffect(() => {
    const body = document.body;

    // Sınıfı kaldır
    body.classList.remove("sunny", "rainy", "snowy", "cloudy", "foggy");

    // Yeni hava durumu sınıfını ekle
    switch (weatherCondition) {
      case "rain":
        body.classList.add("rainy");
        break;
      case "snow":
        body.classList.add("snowy");
        break;
      case "clouds":
        body.classList.add("cloudy");
        break;
      case "clear":
        body.classList.add("sunny");
        break;
      case "mist":
      case "fog":
        body.classList.add("foggy");
        break;
      default:
        body.classList.add("sunny");
    }
  }, [weatherCondition]);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      );
      setWeather(response.data);
      setWeatherCondition(response.data.weather[0].main.toLowerCase());
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("City not found or there was an error fetching the data.");
    }
  };

  const getAnimation = () => {
    switch (weatherCondition) {
      case "rain":
        return rainAnimation;
      case "snow":
        return snowAnimation;
      case "clouds":
        return cloudyAnimation;
      case "fog":
      case "mist":
        return fogAnimation;
      case "scattered clouds":
        return scatteredCloudsAnimation;
      case "sleet":
        return sleetAnimation;
      case "clear":
      default:
        return sunnyAnimation;
    }
  };

  const getWeatherIcon = () => {
    switch (weatherCondition) {
      case "rain":
        return "fas fa-cloud-showers-heavy";
      case "snow":
        return "fas fa-snowflake";
      case "clouds":
        return "fas fa-cloud";
      case "fog":
      case "mist":
        return "fas fa-smog";
      case "scattered clouds":
        return "fas fa-cloud-sun";
      case "sleet":
        return "fas fa-cloud-meatball";
      case "clear":
      default:
        return "fas fa-sun";
    }
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && fetchWeather()} // Enter ile arama
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {weather && (
        <div className="weather-display">
          {/* Lottie Animasyonu */}
          <div className="animation-container">
            <Lottie
              options={{
                animationData: getAnimation(),
                loop: true,
                autoplay: true,
              }}
              height={150}
              width={150}
            />
          </div>

          {/* Hava durumu bilgisi */}
          <div className="weather-info">
            <h2>
              {weather.name}
              <i className={`${getWeatherIcon()} weather-icon`}></i>
            </h2>
            <p>
              <i className="fas fa-thermometer-half"></i>
              Temperature: {weather.main.temp}°C
            </p>
            <p>
              <i className={`${getWeatherIcon()}`}></i>
              Weather: {weather.weather[0].description}
            </p>
            <p>
              <i className="fas fa-tint"></i>
              Humidity: {weather.main.humidity}%
            </p>
            <p>
              <i className="fas fa-wind"></i>
              Wind Speed: {weather.wind.speed} m/s
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
