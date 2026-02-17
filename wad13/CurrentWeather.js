import { useEffect, useState } from "react";
import weatherService from "../services/weatherService";

const CurrentWeather = ({ city, setCoordinates }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService.getCurrentWeather(city)
      .then((data) => {
        setWeather(data);
        setCoordinates({
          lat: data.coord.lat,
          lon: data.coord.lon,
        });
      })
      .catch(console.error);
  }, [city, setCoordinates]);

  if (!weather) return <p>Loading current weather...</p>;

  return (
    <div>
      <h2>Current Weather – {weather.name}</h2>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Condition: {weather.weather[0].description}</p>
    </div>
  );
};

export default CurrentWeather;