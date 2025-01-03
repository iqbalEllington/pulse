import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });


const PolarAreaChart = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  // Ensure the component only renders on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper function to process data into labels and series
  const processData = (data) => {
    // if (!data || !Array.isArray(data)) return { labels: [], series: [] };
 
      var labels = []
      var series = []
      Object.keys(data).map((keyBy, value) => {
        labels.push(data[value]["attributes"]["name"])
        series.push(data[value]["attributes"]["soldUnitAMount"])
      })

    return { labels, series };
  };

  const { labels, series } = processData(data);

  if (!isClient) {
    return null; // You can return a placeholder or loading spinner here
  }

  const options = {
    chart: {
      type: 'pie',
    },
    labels: labels || [], // Use processed labels
    stroke: {
      colors: ['#fff'],
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'bottom',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 0.1
      }
    }
  };

  return (
    <div>
      <h3>Polar Area Chart</h3>
      <DynamicApexChart options={options} series={series || []} type="pie" height={350} />
    </div>
  );
};

export default PolarAreaChart;
