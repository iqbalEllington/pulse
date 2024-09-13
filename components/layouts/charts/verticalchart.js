import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['May', 'Jun', 'July', 'August', 'September', 'October'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [ 5, 6, 7, 5, 5,30],
      backgroundColor: 'rgba(64, 72, 95, 1)',
    }
  ],
};

export default function verticalchart() {
  return <Bar height={207} options={options} data={data} />;
}
