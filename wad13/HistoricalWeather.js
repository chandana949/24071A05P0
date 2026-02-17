import { useEffect, useState } from "react";
import weatherService from "../services/weatherService";
import TemperatureChart from "../charts/TemperatureChart";

const HistoricalWeather = ({ city }) => {
  const [temps, setTemps] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await weatherService.getForecastWeather(city);

      // Take one data point per day
      const dailyData = data.list.filter(
        (_, index) => index % 8 === 0
      );

      setTemps(dailyData.map(d => d.main.temp));
      setLabels(dailyData.map(d =>
        new Date(d.dt * 1000).toLocaleDateString()
      ));
    };

    fetchData();
  }, [city]);

  return (
    <div>
      <h2>Weather Trend (Next 5 Days)</h2>
      <TemperatureChart labels={labels} data={temps} />
    </div>
  );
};

export default HistoricalWeather;