"use client";

import { useCallback,useEffect, useState } from "react";
import { useLocale } from "next-intl";

import { WeatherService } from "@/app/services/weatherService";

export const useWeather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000,
          maximumAge: 60000,
        });
      });

      const { latitude, longitude } = position.coords;

      const weatherData = await WeatherService.getCurrentWeather(latitude, longitude);

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

      const forecastDays = [];
      if (weatherData.daily) {
        for (let i = 0; i < 10; i++) {
          const weatherInfo = WeatherService.getWeatherDescription(
            weatherData.daily.weather_code[i]
          );
          forecastDays.push({
            date: new Date(weatherData.daily.time[i]).toLocaleDateString(
              locale === "en" ? "en-US" : "es-ES",
              {
                weekday: "short",
              }
            ),
            temp_min: Math.round(weatherData.daily.temperature_2m_min[i]),
            temp_max: Math.round(weatherData.daily.temperature_2m_max[i]),
            description: weatherInfo.description,
            icon: weatherInfo.icon,
          });
        }
      }
      setForecast(forecastDays);
    } catch (err: any) {
      console.error("Weather fetch error:", err);
      setError("Unable to fetch weather data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();

    const interval = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchWeather]);

  return {
    weather,
    forecast,
    location,
    loading,
    error,
    refetch: fetchWeather,
  };
};
