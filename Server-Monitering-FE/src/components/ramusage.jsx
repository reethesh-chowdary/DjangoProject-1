import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import './ramusage.css';
function RamUsageGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/server/1/usage/');
        const resData = response.data;
        console.log(resData);
        const formattedData = resData.map(item => ({
          timestamp: new Date(item.timestamp).toLocaleString('en-US', { month: 'short' }),
          ram: item.ram_usage_percent
        }));
        setData(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
     <div className="graph-page">
      <div className="graph-container">
        <h2 className="graph-heading">RAM Usage Over Months</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#444" strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" stroke="#bbb" />
            <YAxis stroke="#bbb" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px', color: '#fff' }}
              labelStyle={{ color: '#f1c40f' }}
            />
            <Line
              type="monotone"
              dataKey="ram"
              stroke="#f1c40f"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RamUsageGraph;

