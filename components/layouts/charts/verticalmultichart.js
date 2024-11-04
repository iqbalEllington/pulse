import * as React from 'react';
import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import styles from "./multibar.module.css";


export default function verticalmultichart() {
  const getFormattedDate = (daysAgo = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
  
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  };
  const labels = [getFormattedDate(6), getFormattedDate(5), getFormattedDate(4), getFormattedDate(3), getFormattedDate(2), getFormattedDate(1), getFormattedDate(0)];
  const lData = [42, 24, 56, 45, 3,45, 3];
  const rData = [57, 7, 19, 16, 22,45, 3];
  const colors = ['#EDEAE3', '#D1AC8C'];
  
  return (
    <div>
    <BarChart
      className={"pulsecharts-bar"}
      sx={{
        // Target the X-axis tick labels and customize their color
        '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
          color: 'blue', // Replace 'blue' with your desired color
        },
        '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel tspan': {
          color: 'white', // Replace 'blue' with your desired color
        },
      }}
      // sx={{
      //   // Target the X-axis tick labels and customize their color
      //   '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
      //     color: 'blue', // Replace 'blue' with your desired color
      //   },
      // }}
      // sx= {{
      //   [`& .${axisClasses.directionX} .${axisClasses.label}`]: {
      //     color: "white"
      //   },
      // }}
      xAxis={[
        { scaleType: 'band', 
          data: labels 
        },
        
      ]}
      series={[
        { data: lData, label: 'Sales', id: 'l_id' },
        { data: rData, label: 'Collection', id: 'r_id' },
      ]}
      barLabel={(item, context) => {
        // if ((item.value ?? 0) > 10) {
        //   return 'High';
        // }
        return item.value?.toString() + "M" ;
      }}    
      colors={colors}
      width={900}
      height={400}
      borderRadius={30}

    />
    <div className='labels-custom'>
      {labels.map((key, value)=>{
        return <span style={{width:(100/labels.length + "%")}}> {labels[value]}</span>
      })}
    </div>
    </div>
  );
}