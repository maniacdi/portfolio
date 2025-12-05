"use client";

import { useState, useEffect } from "react";
import { WeatherService } from "@/app/services/weatherService";

export const useWeather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

        // Get user location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            maximumAge: 60000,
          });
        });

        const { latitude, longitude } = position.coords;

        // Fetch weather data
        const weatherData = await WeatherService.getCurrentWeather(latitude, longitude);

        // Get city name from coordinates
        const cityResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const cityData = await cityResponse.json();
        const locationName =
          cityData.address?.city ||
          cityData.address?.town ||
          cityData.address?.village ||
          "Current Location";

        setLocation(locationName);
        setWeather(weatherData);

        // Prepare forecast from daily data
        const forecastDays = [];
        if (weatherData.daily) {
          for (let i = 0; i < 5; i++) {
            const weatherInfo = WeatherService.getWeatherDescription(
              weatherData.daily.weather_code[i]
            );
            forecastDays.push({
              date: new Date(weatherData.daily.time[i]).toLocaleDateString("en-US", {
                weekday: "short",
              }),
              temp_min: Math.round(weatherData.daily.temperature_2m_min[i]),
              temp_max: Math.round(weatherData.daily.temperature_2m_max[i]),
              description: weatherInfo.description,
              icon: weatherInfo.icon,
            });
          }
        }
        setForecast(forecastDays);

        setError(null);
      } catch (err: any) {
        console.error("Weather fetch error:", err);
        setError("Unable to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    weather,
    forecast,
    location,
    loading,
    error,
  };
};
