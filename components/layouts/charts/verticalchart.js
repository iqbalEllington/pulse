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
      display: false, // Set to true to display legends for both datasets
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
    scales: {
      y: {
        grid: {
          drawBorder: false, // Hide the Y-axis line
          display: false,
        },
        ticks: {
          drawBorder: false, // Hide the Y-axis line
          display: false, // Optionally hide Y-axis labels
        }
      },
      x: {
        display: false, 
        grid: {
          display: false, // Optionally hide grid lines on X-axis
        },
        ticks: {
          drawBorder: false,
          display: false, // Optionally hide Y-axis labels
        }
      },
    },
  },
};
const getDate = (daysAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short'
  }).format(date);
};
const labels = [getDate(), getDate(1), getDate(2), getDate(3), getDate(4), getDate(5), getDate(6)];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [5, 6, 7, 5, 5, 30],
      backgroundColor: '#D1AC8C',
      borderRadius: 10,
      barThickness: 20,
      barLabel:"value"
    },
    {
      label: 'Dataset 2', // This label can represent a second metric
      data: [10, 15, 8, 12, 10, 25],
      backgroundColor: '#EDEAE3', // Use a different color for distinction
      borderRadius: 10,
      barLabel:"value"
    }
  ],
};

export default function VerticalChart() {
  return <Bar height={207} options={options} data={data} />;
}
