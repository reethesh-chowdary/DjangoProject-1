import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactSpeedometer from "react-d3-speedometer";
import './CpuSpeedometer.css';
function CpuSpeedometer() {
  const [cpuUsage, setCpuUsage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/server/1/usage/');
        const resData = response.data;
        console.log(resData);
        const latestUsage = resData[0]?.cpu_usage_percent || 0;
        setCpuUsage(latestUsage);

        console.log(latestUsage);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="speedometer-container">
      <ReactSpeedometer
        maxValue={100}
        value={cpuUsage}
        needleColor="red"
        startColor="green"
        segments={5}
        endColor="blue"
        height={200}
      />
      <h1 className="cpu-usage-text"> 
        CPU Usage: {cpuUsage}%
      </h1>
      {cpuUsage < 50 
        ? <h2>CPU Usage is <span className="warning-text">Good</span></h2>
        : <h2>CPU Usage is <span className="normal-text">Excellent</span> </h2>
      }
    </div>

  );
}

export default CpuSpeedometer;