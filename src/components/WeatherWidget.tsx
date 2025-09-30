import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Thermometer, 
  Wind, 
  Eye, 
  Droplets, 
  Sunrise, 
  Sunset,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function WeatherWidget() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock weather data - in a real app, this would come from a weather API
  const currentWeather = {
    temperature: 72,
    condition: "Partly Cloudy",
    icon: Sun,
    humidity: 65,
    windSpeed: 8,
    visibility: 10,
    uvIndex: 6,
    pressure: 30.12,
    feelsLike: 75,
    sunrise: "6:42 AM",
    sunset: "7:18 PM"
  };

  const hourlyForecast = [
    { time: "Now", temp: 72, condition: "Partly Cloudy", icon: Sun },
    { time: "2 PM", temp: 75, condition: "Sunny", icon: Sun },
    { time: "3 PM", temp: 77, condition: "Sunny", icon: Sun },
    { time: "4 PM", temp: 76, condition: "Partly Cloudy", icon: Cloud },
    { time: "5 PM", temp: 74, condition: "Cloudy", icon: Cloud },
    { time: "6 PM", temp: 71, condition: "Light Rain", icon: CloudRain }
  ];

  const weeklyForecast = [
    { day: "Today", high: 77, low: 58, condition: "Partly Cloudy", icon: Sun },
    { day: "Tomorrow", high: 79, low: 61, condition: "Sunny", icon: Sun },
    { day: "Wednesday", high: 75, low: 59, condition: "Light Rain", icon: CloudRain },
    { day: "Thursday", high: 73, low: 56, condition: "Cloudy", icon: Cloud },
    { day: "Friday", high: 78, low: 62, condition: "Sunny", icon: Sun }
  ];

  const getUVIndexColor = (index: number) => {
    if (index <= 2) return "bg-green-500";
    if (index <= 5) return "bg-yellow-500";
    if (index <= 7) return "bg-orange-500";
    if (index <= 10) return "bg-red-500";
    return "bg-purple-500";
  };

  const getUVIndexLabel = (index: number) => {
    if (index <= 2) return "Low";
    if (index <= 5) return "Moderate";
    if (index <= 7) return "High";
    if (index <= 10) return "Very High";
    return "Extreme";
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl mb-4">Current Weather</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed with real-time weather conditions and forecasts for Riverside.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Weather Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-0">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-2">
                  <currentWeather.icon className="w-16 h-16" />
                </div>
                <CardTitle className="text-4xl mb-2">{currentWeather.temperature}°F</CardTitle>
                <CardDescription className="text-blue-100 text-lg">
                  {currentWeather.condition}
                </CardDescription>
                <div className="text-blue-100 text-sm">
                  Feels like {currentWeather.feelsLike}°F
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-center text-blue-100 text-sm">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-center text-blue-100 text-lg">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Sunrise className="w-4 h-4 text-yellow-300" />
                    <div>
                      <div className="text-xs text-blue-100">Sunrise</div>
                      <div className="text-sm">{currentWeather.sunrise}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sunset className="w-4 h-4 text-orange-300" />
                    <div>
                      <div className="text-xs text-blue-100">Sunset</div>
                      <div className="text-sm">{currentWeather.sunset}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Detailed Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Weather Details Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl mb-1">{currentWeather.humidity}%</div>
                  <div className="text-sm text-muted-foreground">Humidity</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Wind className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                  <div className="text-2xl mb-1">{currentWeather.windSpeed} mph</div>
                  <div className="text-sm text-muted-foreground">Wind Speed</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Eye className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl mb-1">{currentWeather.visibility} mi</div>
                  <div className="text-sm text-muted-foreground">Visibility</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-full ${getUVIndexColor(currentWeather.uvIndex)} flex items-center justify-center text-white font-bold`}>
                    {currentWeather.uvIndex}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    UV {getUVIndexLabel(currentWeather.uvIndex)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Hourly Forecast */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hourly Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {hourlyForecast.map((hour, index) => (
                    <motion.div
                      key={hour.time}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex-shrink-0 text-center p-3 bg-muted/50 rounded-lg min-w-[80px]"
                    >
                      <div className="text-xs text-muted-foreground mb-2">{hour.time}</div>
                      <hour.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                      <div className="font-medium">{hour.temp}°</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* 5-Day Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">5-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyForecast.map((day, index) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 text-sm font-medium">{day.day}</div>
                      <day.icon className="w-6 h-6 text-blue-600" />
                      <div className="text-sm text-muted-foreground min-w-[100px]">{day.condition}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm">
                        <TrendingUp className="w-4 h-4 text-red-500" />
                        <span className="font-medium">{day.high}°</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <TrendingDown className="w-4 h-4 text-blue-500" />
                        <span className="text-muted-foreground">{day.low}°</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}