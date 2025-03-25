import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = ({ data, options }) => {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
    ...options,
  };

  return <Pie data={data} options={defaultOptions} />;
};

export default PieChart;