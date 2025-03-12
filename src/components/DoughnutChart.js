import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/DoughnutChart.css";

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [animate, setAnimate] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState("Hover on a section");
  const [hoveredMinutes, setHoveredMinutes] = useState("");

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300); // Delayed animation start
  }, []);

  const data = {
    labels: ["The Weeknd", "PARTYNEXTDOOR", "Bad Bunny", "Lil Baby", "Drake"],
    datasets: [
      {
        data: [1147, 438, 249, 234, 172],
        backgroundColor: ["#004d00", "#007000", "#009900", "#00cc00", "#00ff00"],
        hoverBackgroundColor: ["#006600", "#008b00", "#00b300", "#00e600", "#33ff33"],
        borderWidth: 0,
        cutout: "65%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false, // Hide default tooltip
        external: (context) => {
          const tooltip = context.tooltip;
          if (tooltip.opacity === 0) {
            setHoveredLabel("Hover on a section");
            setHoveredMinutes("");
            return;
          }
          const index = tooltip.dataPoints[0].dataIndex;
          setHoveredLabel(data.labels[index]);
          setHoveredMinutes(data.datasets[0].data[index] + " min");
        },
      },
      legend: {
        display: false,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div className="chart-wrapper">
      <div className={`chart-container ${animate ? "fade-in" : ""}`}>
        <Doughnut data={data} options={options} />
        <div className="chart-label">February</div>
      </div>
      <div className="chart-info">
        <p className="info-title">Minutes Listened</p>
        <p className="info-hover">{hoveredLabel}</p>
        <p className="info-minutes">{hoveredMinutes}</p>
      </div>
    </div>
  );
};

export default DoughnutChart;