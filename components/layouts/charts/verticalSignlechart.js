import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import styles from "./multibar.module.css";
import React, { Component, useState, useEffect } from "react";
import { API_URLS } from "helper/apiConstant";
import { getRequest } from "helper/api";


export default function verticalSignlechart(props) {
  const getFormattedDate = (daysAgo = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  };
  const labels = [getFormattedDate(6), getFormattedDate(5), getFormattedDate(4), getFormattedDate(3), getFormattedDate(2), getFormattedDate(1), getFormattedDate(0)];
  const [lData,setLdata] = useState([]);
  const [rData,setRdata] = useState([]);
  const colors = ['#EDEAE3', '#D1AC8C'];
  const [loading, setIsLoading] = useState(false)

  async function getData() {

    var url;
    if (props.data == "daily-7-days") {
      // getroeprties()
      url = API_URLS.GET_PROPERTIES + '?filters[name][containsi]=all project&pagination[page]=1&filters[occuarance][$in][0]=zero&filters[occuarance][$in][1]=one&filters[occuarance][$in][2]=two&filters[occuarance][$in][3]=three&filters[occuarance][$in][4]=four&filters[occuarance][$in][5]=five&filters[occuarance][$in][6]=six&filters[occuarance][$in][7]=seven&pagination[pageSize]=1000&&sort=id:desc'
    }
    var response;
    response = await getRequest({ API: url });
    var data = []
    if (await response?.status === 200) {
      var ldata=[]
      var rdata=[]
      response.data?.data.map((value,key)=>{
        ldata.push(value.attributes.soldUnitAMount)
        rdata.push(value.attributes.recieptCollection)
      })
      setLdata(ldata)
      setRdata(rdata)
    } else if (response?.status === 401) {
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  useEffect(() => {
    getData()

  }, [])
  return (
    <div>
      {rData.length > 0 &&
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
          {
            scaleType: 'band',
            data: labels
          },

        ]}
        if
        series={
          (props.datakey == "Collection") ?
            [
              { data: rData, label: 'Collection', id: 'r_id' },
            ] : [

              { data: lData, label: 'Sales', id: 'l_id' },
            ]
        }
        barLabel={(item, context) => {
          // if ((item.value ?? 0) > 10) {
          //   return 'High';
          // }
          return ((item.value/1000000).toFixed(1)).toString() + "M";
        }}
        colors={colors}
        width={650}
        height={350}
        borderRadius={30}

      />
}
      <div className='labels-custom'>
        {labels.map((key, value) => {
          return <span style={{ width: (100 / labels.length + "%") }}> {labels[value]}</span>
        })}
      </div>
    </div>
  );
}