import { useState, useEffect } from 'react';

// 🌡️ LIVE WEATHER FOR KARUR, TAMIL NADU
// Currently using realistic simulation. To enable real API:
// 1. Get API key from openweathermap.org
// 2. Uncomment fetchRealWeatherAPI function below
// 3. Replace simulation call with: await fetchRealWeatherAPI()
// Coordinates: Karur (10.9601°N, 78.0766°E)

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  city: string;
}

interface UseWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

// Mock weather data for development/fallback - Karur typical climate
const mockWeatherData: WeatherData = {
  temperature: 88, // 31°C converted to Fahrenheit
  condition: 'Sunny',
  icon: 'sun',
  humidity: 72,
  windSpeed: 12,
  city: 'Karur'
};

export function useWeather(city: string = 'Karur'): UseWeatherReturn {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if we have cached data (cache for 10 minutes)
      const cacheKey = `weather_${city}`;
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTime = localStorage.getItem(`${cacheKey}_time`);
      
      if (cachedData && cacheTime) {
        const cacheAge = Date.now() - parseInt(cacheTime);
        if (cacheAge < 10 * 60 * 1000) { // 10 minutes
          setWeather(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
      }

      // Real API function for live weather data (currently commented out for development)
      // const fetchRealWeatherAPI = async () => {
      //   try {
      //     // OpenWeatherMap API for Karur, Tamil Nadu (10.9601°N, 78.0766°E)
      //     const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
      //     const response = await fetch(
      //       `https://api.openweathermap.org/data/2.5/weather?lat=10.9601&lon=78.0766&appid=${API_KEY}&units=metric`
      //     );
      //     const data = await response.json();
      //     
      //     return {
      //       temperature: Math.round((data.main.temp * 9/5) + 32), // Convert C to F for internal storage
      //       condition: data.weather[0].main,
      //       icon: getWeatherIconFromAPI(data.weather[0].icon),
      //       humidity: data.main.humidity,
      //       windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      //       city: 'Karur'
      //     };
      //   } catch (error) {
      //     console.error('Failed to fetch real weather data:', error);
      //     return mockWeatherData;
      //   }
      // };

      // For development, simulate realistic weather API for Karur, Tamil Nadu
      const simulateWeatherAPI = () => {
        return new Promise<WeatherData>((resolve) => {
          setTimeout(() => {
            const hour = new Date().getHours();
            const month = new Date().getMonth() + 1; // 1-12
            
            // Accurate Karur climate (temperatures in Celsius, converted to Fahrenheit for internal use)
            let baseTempC = 31; // Current realistic temperature for Karur (31°C)
            
            // Seasonal adjustment for Karur, Tamil Nadu
            if (month >= 3 && month <= 6) { // Summer (March-June) - Very Hot
              baseTempC = 38; // 38°C (100°F)
            } else if (month >= 11 || month <= 2) { // Winter (Nov-Feb) - Mild
              baseTempC = 26; // 26°C (79°F)
            } else if (month >= 7 && month <= 9) { // Monsoon (July-September)
              baseTempC = 32; // 32°C (90°F)
            } else { // Post-monsoon (October)
              baseTempC = 30; // 30°C (86°F)
            }
            
            // Daily temperature variation (hotter in afternoon, cooler at night)
            let tempVariationC = 0;
            if (hour >= 6 && hour <= 18) { // Daytime
              tempVariationC = Math.sin((hour - 6) * Math.PI / 12) * 4; // +4°C variation
            } else { // Nighttime - cooler
              tempVariationC = -3 + (Math.random() * 2); // -1 to -3°C cooler
            }
            
            const randomVariationC = (Math.random() - 0.5) * 3; // ±1.5°C random
            const currentTempC = Math.round(baseTempC + tempVariationC + randomVariationC);
            const currentTempF = Math.round((currentTempC * 9/5) + 32); // Convert to Fahrenheit for internal storage
            
            // Weather conditions for Karur climate
            const rand = Math.random();
            let condition = 'Sunny';
            let icon = 'sun';
            let humidity = 65; // Base humidity for tropical climate
            
            // Monsoon season (June-September) - Higher humidity and clouds
            if (month >= 6 && month <= 9) {
              humidity = 82;
              if (rand > 0.3) {
                condition = rand > 0.6 ? 'Cloudy' : 'Partly Cloudy';
                icon = rand > 0.6 ? 'cloud' : 'cloud-sun';
              }
            } else if (currentTempC > 35) { // Very hot days
              condition = 'Sunny';
              icon = 'sun';
              humidity = 58;
            } else if (currentTempC < 24) { // Cooler winter days
              condition = rand > 0.4 ? 'Partly Cloudy' : 'Sunny';
              icon = rand > 0.4 ? 'cloud-sun' : 'sun';
              humidity = 70;
            }
            
            resolve({
              temperature: currentTempF, // Store in Fahrenheit for compatibility
              condition,
              icon,
              humidity: Math.round(humidity + (Math.random() - 0.5) * 15),
              windSpeed: Math.round(8 + Math.random() * 12), // 8-20 km/h typical for Tamil Nadu
              city
            });
          }, 600 + Math.random() * 1000); // Simulate realistic network delay
        });
      };

      // In a real implementation, you would use an actual weather API like:
      // const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`);
      // const data = await response.json();
      
      const weatherData = await simulateWeatherAPI();

      // Cache the data
      localStorage.setItem(cacheKey, JSON.stringify(weatherData));
      localStorage.setItem(`${cacheKey}_time`, Date.now().toString());

      setWeather(weatherData);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Failed to fetch weather data');
      // Use mock data as fallback
      setWeather(mockWeatherData);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    // Clear cache and refetch
    localStorage.removeItem(`weather_${city}`);
    localStorage.removeItem(`weather_${city}_time`);
    fetchWeather();
  };

  useEffect(() => {
    fetchWeather();
    
    // Refresh weather data every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [city]);

  return { weather, loading, error, refresh };
}