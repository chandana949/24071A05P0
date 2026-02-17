import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const TemperatureChart = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data,
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default TemperatureChart;