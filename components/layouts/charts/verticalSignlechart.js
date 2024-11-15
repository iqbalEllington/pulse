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
  const [lData, setLdata] = useState([]);
  const [rData, setRdata] = useState([]);
  var colors;
  if (props.theme == "gold") {
    colors = ['#D1AC8C'];
  } else {
    colors = ['#EDEAE3'];
  }
  const [loading, setIsLoading] = useState(false)

  // async function getData() {

  //   var url;
  //   if (props.data == "daily-7-days") {
  //     // getroeprties()
  //     url = API_URLS.GET_PROPERTIES + '?filters[name][$containsi]='+props.project+'&pagination[page]=1&filters[occuarance][$in][0]=zero&filters[occuarance][$in][1]=one&filters[occuarance][$in][2]=two&filters[occuarance][$in][3]=three&filters[occuarance][$in][4]=four&filters[occuarance][$in][5]=five&filters[occuarance][$in][6]=six=seven&pagination[pageSize]=1000&&sort=id:desc'
  //   }
  //   var response;
  //   response = await getRequest({ API: url });
  //   var data = []
  //   if (await response?.status === 200) {
  //     var ldata = []
  //     var rdata = []
  //     response.data?.data.map((value, key) => {
  //       ldata.push(value.attributes.soldUnitAMount)
  //       rdata.push(value.attributes.recieptCollection)
  //     })
  //     setLdata(ldata)
  //     setRdata(rdata)
  //     console.log("ldata",ldata)
  //     console.log("rdata",rdata)
  //   } else if (response?.status === 401) {
  //     toast("Unauthorize access please re-login.");
  //   } else {
  //     toast(response?.data?.error || "Some thing went wrong.");
  //   }
  // }
  async function getData() {

    // var url;
    // if (props.data == "daily-7-days") {
    //   // getroeprties()
    //   url = API_URLS.GET_PROPERTIES + '?filters[name][$containsi]='+props.project+'&pagination[page]=1&filters[occuarance][$in][0]=zero&filters[occuarance][$in][1]=one&filters[occuarance][$in][2]=two&filters[occuarance][$in][3]=three&filters[occuarance][$in][4]=four&filters[occuarance][$in][5]=five&filters[occuarance][$in][6]=six=seven&pagination[pageSize]=1000&&sort=id:desc'
    // }
    var ldata = []
    var rdata = []
    var response;
    var required=["zero", "one","two", "three", "four", "five", "six"]
    response = props.project;
    // console.log(response, "response.data?.dataresponse.data?.dataresponse.data?.data")
    Object.keys(response).map((value, key) => {
      if(required.includes(value)){
        if(value=="zero"){
          ldata[6]=response[value].attributes.soldUnitAMount
          rdata[6]=response[value].attributes.recieptCollection
        }
        if(value=="one"){
          ldata[5]=response[value].attributes.soldUnitAMount
          rdata[5]=response[value].attributes.recieptCollection
        }
        if(value=="two"){
          ldata[4]=response[value].attributes.soldUnitAMount
          rdata[4]=response[value].attributes.recieptCollection
        }
        if(value=="three"){
          ldata[3]=response[value].attributes.soldUnitAMount
          rdata[3]=response[value].attributes.recieptCollection
        }
        if(value=="four"){
          ldata[2]=response[value].attributes.soldUnitAMount
          rdata[2]=response[value].attributes.recieptCollection
        }
        if(value=="five"){
          ldata[1]=response[value].attributes.soldUnitAMount
          rdata[1]=response[value].attributes.recieptCollection
        }
        if(value=="six"){
          ldata[0]=response[value].attributes.soldUnitAMount
          rdata[0]=response[value].attributes.recieptCollection
        }
      }
    })
    setLdata(ldata)
    setRdata(rdata)
    var data = []
    // if (await response?.status === 200) {
    //   var ldata = []
    //   var rdata = []
    //   response.data?.data.map((value, key) => {
    //     ldata.push(value.attributes.soldUnitAMount)
    //     rdata.push(value.attributes.recieptCollection)
    //   })
    //   setLdata(ldata)
    //   setRdata(rdata)
    //   console.log("ldata",ldata)
    //   console.log("rdata",rdata)
    // } else if (response?.status === 401) {
    //   toast("Unauthorize access please re-login.");
    // } else {
    //   toast(response?.data?.error || "Some thing went wrong.");
    // }
  }
  useEffect(() => {
    getData()
  }, [props.project])
  return (
    <div style={{ pointerEvents: 'none' }}>
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
          series={
            (props.datakey == "Collection") ?
              [
                { data: rData, label: 'Collection', id: 'r_id' },
              ] : [

                { data: lData, label: 'Sales', id: 'l_id' },
              ]
          }
          barLabel={(item, context) => {
            return ((item.value / 1000000).toFixed(1)).toString() + "M";
          }}
          tooltip={{ enabled: false }} 
          disableInteractions
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