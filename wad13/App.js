import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import HistoricalWeather from "./components/HistoricalWeather";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [searchCity, setSearchCity] = useState("");

  const handleSearch = () => {
    setCity(searchCity);
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>

      <input
        placeholder="Enter city name"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {city && (
        <>
          <CurrentWeather
            city={city}
            setCoordinates={setCoordinates}
          />
          <HistoricalWeather city={city} />
        </>
      )}
    </div>
  );
}

export default App;