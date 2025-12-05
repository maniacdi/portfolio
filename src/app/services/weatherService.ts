export class WeatherService {
  static async getCurrentWeather(lat: number, lon: number): Promise<any> {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,pressure_msl&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=10`
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

  static getWeatherDescription(
    code: number,
    locale: string = "en"
  ): { description: string; icon: string } {
    const weatherCodes: Record<number, { description: string; icon: string }> = {
      0: { description: locale === "es" ? "Cielo despejado" : "Clear sky", icon: "sun" },
      1: {
        description: locale === "es" ? "Mayormente despejado" : "Mainly clear",
        icon: "sun-cloud",
      },
      2: {
        description: locale === "es" ? "Parcialmente nublado" : "Partly cloudy",
        icon: "cloud-sun",
      },
      3: { description: locale === "es" ? "Nublado" : "Overcast", icon: "cloud" },
      45: { description: locale === "es" ? "Niebla" : "Fog", icon: "cloud-fog" },
      48: {
        description: locale === "es" ? "Niebla escarchada" : "Depositing rime fog",
        icon: "cloud-fog",
      },
      51: {
        description: locale === "es" ? "Llovizna ligera" : "Light drizzle",
        icon: "cloud-drizzle",
      },
      53: {
        description: locale === "es" ? "Llovizna moderada" : "Moderate drizzle",
        icon: "cloud-drizzle",
      },
      55: {
        description: locale === "es" ? "Llovizna densa" : "Dense drizzle",
        icon: "cloud-drizzle",
      },
      56: {
        description: locale === "es" ? "Llovizna helada ligera" : "Light freezing drizzle",
        icon: "cloud-snow",
      },
      57: {
        description: locale === "es" ? "Llovizna helada densa" : "Dense freezing drizzle",
        icon: "cloud-snow",
      },
      61: { description: locale === "es" ? "Lluvia ligera" : "Slight rain", icon: "cloud-rain" },
      63: {
        description: locale === "es" ? "Lluvia moderada" : "Moderate rain",
        icon: "cloud-rain",
      },
      65: {
        description: locale === "es" ? "Lluvia fuerte" : "Heavy rain",
        icon: "cloud-rain-heavy",
      },
      66: {
        description: locale === "es" ? "Lluvia helada ligera" : "Light freezing rain",
        icon: "cloud-snow",
      },
      67: {
        description: locale === "es" ? "Lluvia helada fuerte" : "Heavy freezing rain",
        icon: "cloud-snow",
      },
      71: { description: locale === "es" ? "Nieve ligera" : "Slight snow", icon: "snowflake" },
      73: { description: locale === "es" ? "Nieve moderada" : "Moderate snow", icon: "snowflake" },
      75: { description: locale === "es" ? "Nieve fuerte" : "Heavy snow", icon: "snowflake" },
      77: { description: locale === "es" ? "Granos de nieve" : "Snow grains", icon: "snowflake" },
      80: {
        description: locale === "es" ? "Chubascos ligeros" : "Slight rain showers",
        icon: "cloud-rain",
      },
      81: {
        description: locale === "es" ? "Chubascos moderados" : "Moderate rain showers",
        icon: "cloud-rain",
      },
      82: {
        description: locale === "es" ? "Chubascos violentos" : "Violent rain showers",
        icon: "cloud-rain-heavy",
      },
      85: {
        description: locale === "es" ? "Chubascos de nieve ligeros" : "Slight snow showers",
        icon: "cloud-snow",
      },
      86: {
        description: locale === "es" ? "Chubascos de nieve fuertes" : "Heavy snow showers",
        icon: "cloud-snow",
      },
      95: {
        description: locale === "es" ? "Tormenta eléctrica" : "Thunderstorm",
        icon: "cloud-lightning",
      },
      96: {
        description: locale === "es" ? "Tormenta con granizo" : "Thunderstorm with hail",
        icon: "cloud-lightning-rain",
      },
      99: {
        description:
          locale === "es" ? "Tormenta fuerte con granizo" : "Heavy thunderstorm with hail",
        icon: "cloud-lightning-rain",
      },
    };

    return (
      weatherCodes[code] || {
        description: locale === "es" ? "Desconocido" : "Unknown",
        icon: "cloud",
      }
    );
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
