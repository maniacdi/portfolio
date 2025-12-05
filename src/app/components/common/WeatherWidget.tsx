"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Thermometer,
  Droplets,
  Wind,
  Sunrise,
  Sunset,
  MapPin,
  ChevronDown,
  ChevronUp,
  Cloud,
  CloudSun,
  CloudRain,
  Snowflake,
  Zap,
  Sun,
  ChevronsDown,
} from "lucide-react";
import { useWeather } from "@/app/hooks/useWeather";
import { WeatherService } from "@/app/services/weatherService";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLocale } from "next-intl";
import "./WeatherWidget.scss";
import { useLoading } from "@/app/hooks/useLoading";

export default function WeatherWidget() {
  const { weather, forecast, location, loading: weatherLoading, error } = useWeather();
  const { showLoading, hideLoading } = useLoading();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const locale = useLocale();
  const dateLocale = locale === "es" ? es : enUS;

  useEffect(() => {
    if (weatherLoading) {
      showLoading("Loading weather data...");
    } else {
      hideLoading();
    }
  }, [weatherLoading, showLoading, hideLoading]);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return format(date, "HH:mm", { locale: dateLocale });
  };

  // Get weather icon based on condition
  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case "sun":
        return Sun;
      case "sun-cloud":
        return CloudSun;
      case "cloud-sun":
        return CloudSun;
      case "cloud":
        return Cloud;
      case "cloud-fog":
        return Cloud;
      case "cloud-drizzle":
        return CloudRain;
      case "cloud-rain":
        return CloudRain;
      case "cloud-rain-heavy":
        return CloudRain;
      case "cloud-snow":
        return Snowflake;
      case "snowflake":
        return Snowflake;
      case "cloud-lightning":
        return Zap;
      case "cloud-lightning-rain":
        return Zap;
      default:
        return CloudSun;
    }
  };

  if (error || !weather) {
    return (
      <div className="weather-widget-minimized">
        <button
          className="weather-toggle-btn error"
          onClick={() => setIsVisible(true)}
          title="Show weather"
        >
          <Cloud size={18} />
          <span>Error</span>
        </button>
      </div>
    );
  }

  const weatherInfo = WeatherService.getWeatherDescription(weather.weather_code);
  const weatherColor = WeatherService.getWeatherColor(weather.weather_code);
  const emojiIcon = WeatherService.getWeatherIcon(weatherInfo.icon);
  const WeatherIcon = getWeatherIcon(weatherInfo.icon);

  // Minimized view
  if (isMinimized) {
    return (
      <motion.div
        className="weather-widget-minimized"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
      >
        <button
          className="weather-toggle-btn"
          onClick={() => setIsMinimized(false)}
          style={{ borderColor: weatherColor }}
          title="Show weather"
        >
          <WeatherIcon size={18} />
          <span>{weather.temp}°C</span>
        </button>
      </motion.div>
    );
  }

  // Full widget view
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="weather-widget-container"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <motion.div
            className={`weather-widget ${isExpanded ? "expanded" : ""}`}
            style={{ "--weather-color": weatherColor } as any}
            whileHover={{ scale: 1.02 }}
          >
            {/* Header with improved controls */}
            <div className="weather-header">
              <div className="location">
                <MapPin size={14} />
                <span className="city">{location}</span>
                <span className="temp">{weather.temp}°C</span>
              </div>

              <div className="weather-actions">
                <button
                  className="action-btn expand-btn"
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
                <button
                  className="action-btn minimize-btn"
                  onClick={() => setIsMinimized(true)}
                  title="Minimize"
                >
                  <ChevronsDown size={14} />
                </button>
              </div>
            </div>

            {/* Current Weather */}
            <div className="current-weather">
              <div className="weather-main">
                <div className="weather-icon">
                  <span className="weather-emoji">{emojiIcon}</span>
                  <WeatherIcon className="weather-icon-svg" size={32} />
                </div>
                <div className="weather-info">
                  <span className="description">{weatherInfo.description}</span>
                  <span className="feels-like">Feels like: {weather.feels_like}°C</span>
                </div>
              </div>

              <div className="weather-details">
                <div className="detail-item">
                  <Droplets size={14} />
                  <span>{weather.humidity}%</span>
                </div>
                <div className="detail-item">
                  <Wind size={14} />
                  <span>{Math.round(weather.wind_speed * 3.6)} km/h</span>
                </div>
                <div className="detail-item">
                  <Thermometer size={14} />
                  <span>{weather.pressure} hPa</span>
                </div>
              </div>
            </div>

            {/* Expanded Forecast */}
            <AnimatePresence>
              {isExpanded && weather.sunrise && (
                <motion.div
                  className="weather-forecast"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {/* Sunrise/Sunset */}
                  <div className="sun-times">
                    <div className="sun-time">
                      <Sunrise size={14} />
                      <span>Sunrise: {formatTime(weather.sunrise)}</span>
                    </div>
                    <div className="sun-time">
                      <Sunset size={14} />
                      <span>Sunset: {formatTime(weather.sunset)}</span>
                    </div>
                  </div>

                  {/* 5-Day Forecast */}
                  {forecast.length > 0 && (
                    <div className="forecast-days">
                      <h4>5-Day Forecast</h4>
                      <div className="forecast-grid">
                        {forecast.map((day, index) => (
                          <div key={index} className="forecast-day">
                            <span className="day-name">{day.date}</span>
                            <span className="day-emoji">
                              {WeatherService.getWeatherIcon(day.icon)}
                            </span>
                            <div className="day-temps">
                              <span className="temp-max">{day.temp_max}°</span>
                              <span className="temp-min">{day.temp_min}°</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
