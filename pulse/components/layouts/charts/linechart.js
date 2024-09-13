import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y:
    {
      min: 0,
      max: 5000000,
      stepSize: 1000000,
      ticks: {
        // Abbreviate the millions
        callback: function (value, index, values) {
          return value / 1e6 + 'M';
        }
      }
    },
    x: {
        display: true,
    }
  },

  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      display: false
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['May', 'Jun', 'July', 'August', 'September', 'October'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Avarage Sales Price in AED',
      data: [1700000, 1900000, 2300000, 2900000, 1800000, 2700000],
      borderColor: 'rgb(64, 72, 95, .7)',
      backgroundColor: 'rgba(64, 72, 95, 1)',
      parsing: {
        yAxisKey: 'net'
      }
    }
  ],
};

export default function linechart() {
  return <Line options={options} height={250}
    data={data} />;
}
