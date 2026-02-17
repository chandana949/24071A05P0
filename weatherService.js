import axios from "axios";
import config from "../config";

const getCurrentWeather = async (city) => {
  const response = await axios.get(
    `${config.BASE_URL}/weather`,
    {
      params: {
        q: city,
        units: "metric",
        appid: config.API_KEY,
      },
    }
  );
  return response.data;
};

// 5-day / 3-hour forecast (used as historical trend)
const getForecastWeather = async (city) => {
  const response = await axios.get(
    `${config.BASE_URL}/forecast`,
    {
      params: {
        q: city,
        units: "metric",
        appid: config.API_KEY,
      },
    }
  );
  return response.data;
};

const weatherService = {
  getCurrentWeather,
  getForecastWeather,
};

export default weatherService;