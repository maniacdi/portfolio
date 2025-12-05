export class WeatherService {
  static async getCurrentWeather(lat: number, lon: number): Promise<any> {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,pressure_msl&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=5`
      );

      const data = await response.json();

      return {
        temp: Math.round(data.current.temperature_2m),
        feels_like: Math.round(data.current.apparent_temperature),
        humidity: data.current.relative_humidity_2m,
        pressure: data.current.pressure_msl,
        wind_speed: data.current.wind_speed_10m,
        precipitation: data.current.precipitation,
        weather_code: data.current.weather_code,
        sunrise: this.convertToTimestamp(data.daily.sunrise[0]),
        sunset: this.convertToTimestamp(data.daily.sunset[0]),
        timezone: data.timezone,
        hourly: data.hourly.temperature_2m.slice(0, 24), // Next 24 hours
        daily: data.daily,
      };
    } catch (error) {
      console.error("Error fetching weather from Open-Meteo:", error);
      throw error;
    }
  }

  private static convertToTimestamp(dateString: string): number {
    return new Date(dateString).getTime() / 1000;
  }

  static getWeatherDescription(code: number): { description: string; icon: string } {
    const weatherCodes: Record<number, { description: string; icon: string }> = {
      0: { description: "Clear sky", icon: "sun" },
      1: { description: "Mainly clear", icon: "sun-cloud" },
      2: { description: "Partly cloudy", icon: "cloud-sun" },
      3: { description: "Overcast", icon: "cloud" },
      45: { description: "Fog", icon: "cloud-fog" },
      48: { description: "Depositing rime fog", icon: "cloud-fog" },
      51: { description: "Light drizzle", icon: "cloud-drizzle" },
      53: { description: "Moderate drizzle", icon: "cloud-drizzle" },
      55: { description: "Dense drizzle", icon: "cloud-drizzle" },
      56: { description: "Light freezing drizzle", icon: "cloud-snow" },
      57: { description: "Dense freezing drizzle", icon: "cloud-snow" },
      61: { description: "Slight rain", icon: "cloud-rain" },
      63: { description: "Moderate rain", icon: "cloud-rain" },
      65: { description: "Heavy rain", icon: "cloud-rain-heavy" },
      66: { description: "Light freezing rain", icon: "cloud-snow" },
      67: { description: "Heavy freezing rain", icon: "cloud-snow" },
      71: { description: "Slight snow", icon: "snowflake" },
      73: { description: "Moderate snow", icon: "snowflake" },
      75: { description: "Heavy snow", icon: "snowflake" },
      77: { description: "Snow grains", icon: "snowflake" },
      80: { description: "Slight rain showers", icon: "cloud-rain" },
      81: { description: "Moderate rain showers", icon: "cloud-rain" },
      82: { description: "Violent rain showers", icon: "cloud-rain-heavy" },
      85: { description: "Slight snow showers", icon: "cloud-snow" },
      86: { description: "Heavy snow showers", icon: "cloud-snow" },
      95: { description: "Thunderstorm", icon: "cloud-lightning" },
      96: { description: "Thunderstorm with hail", icon: "cloud-lightning-rain" },
      99: { description: "Heavy thunderstorm with hail", icon: "cloud-lightning-rain" },
    };

    return weatherCodes[code] || { description: "Unknown", icon: "cloud" };
  }

  static getWeatherIcon(iconName: string): string {
    const icons: Record<string, string> = {
      sun: "☀️",
      "sun-cloud": "⛅",
      "cloud-sun": "🌤️",
      cloud: "☁️",
      "cloud-fog": "🌫️",
      "cloud-drizzle": "🌧️",
      "cloud-rain": "🌧️",
      "cloud-rain-heavy": "⛈️",
      "cloud-snow": "🌨️",
      snowflake: "❄️",
      "cloud-lightning": "🌩️",
      "cloud-lightning-rain": "⛈️",
    };

    return icons[iconName] || "☁️";
  }

  static getWeatherColor(code: number): string {
    const colorMap: Record<number, string> = {
      0: "#FFD700", // Clear - Gold
      1: "#FFEC8B", // Mainly clear - Light gold
      2: "#A9A9A9", // Partly cloudy - Gray
      3: "#808080", // Overcast - Dark gray
      45: "#D3D3D3", // Fog - Light gray
      48: "#C0C0C0", // Fog - Silver
      51: "#87CEEB", // Drizzle - Sky blue
      61: "#4169E1", // Rain - Royal blue
      71: "#FFFFFF", // Snow - White
      80: "#1E90FF", // Rain showers - Dodger blue
      95: "#4B0082", // Thunderstorm - Indigo
    };

    return colorMap[code] || "#00f3ff"; // Default neon
  }
}
