import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import "./Alerts.css";

const COLORS = {
  Critical: "#826BF8",
  Clear: "#FF9B73",
  Trouble: "#00E096",
};

function Alerts() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/server/1/alerts/summary/"
        );
        const resData = response.data;

        const formattedData = [
          { name: "Critical", value: resData.critical },
          { name: "Clear", value: resData.medium },
          { name: "Trouble", value: resData.low },
        ];

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="heatmap-container-horizontal">
      <PieChart width={160} height={160}>
        <Pie
          data={chartData}
          innerRadius={50}
          outerRadius={70}
          paddingAngle={5}
          dataKey="value"
        >
          {chartData.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name]} />
          ))}
        </Pie>
      </PieChart>

      <div className="heatmap-legend">
        {chartData.map((entry) => (
          <div key={entry.name} className="legend-item">
            <span
              className="legend-dot"
              style={{ backgroundColor: COLORS[entry.name] }}
            ></span>
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;
