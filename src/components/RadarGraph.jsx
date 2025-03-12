import React from 'react';
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = () => {
    const data = {
    labels: ["HipHop", "R&B", "Pop", "Latin", "Trap", "Pop Rap"],
    datasets: [
        {
        label: "Most Listened Genres",
        data: [3, 3, 3, 1, 4, 4],
        backgroundColor: "rgba(55, 129, 66, 0.2)", // Transparent green fill
    borderColor: "rgba(59, 142, 70, 0.36)", // Green outline
    borderWidth: 2, // Thicker line
    pointBackgroundColor: "rgba(59, 142, 70, 1)", // Green points
    pointBorderColor: "#ffffff", // White border for points
    pointBorderWidth: 1, // Thicker border
    pointRadius: 4, // Larger points
    pointHoverRadius: 6, // Bigger on hover
    pointHoverBackgroundColor: "rgb(2, 179, 64)", // Green on hover
        },
    ],
    };

    const options = {
        plugins: {
        legend: {
            display: false, // Hide legend
        },
        tooltip: {
            enabled: true,
            backgroundColor: "rgba(0, 34, 8, 0.51)", // Dark background
            titleColor: "#ffcc00", // Yellow title
            // titleSize: "16",
            bodyColor: "#fff", // White text
            bodyFont: {
            size: 8,
            weight: "bold",
            },
            padding: 10, // More spacing
            borderColor: "#fff",
            borderWidth: 0.3,
            callbacks: {
            label: function (context) {
                return `Index: ${context.raw}`; // Custom text
            },
            },
        },
        },
        maintainAspectRatio: false,
        interaction: {
        mode: "nearest",
        axis: "r",
        },
        elements: {
        point: {
            radius: 5,
            hoverRadius: 8, // Make points bigger when hovered
            hoverBackgroundColor: "rgb(197, 197, 197)", // Change color on hover
        },
        line: {
            borderWidth: 2,
            hoverBorderWidth: 4, // Make lines thicker on hover
        },
        },
        scales: {
        r: {
            animate: {
                from: 0, // Start from the center
            },
            pointLabels: {
                display: true,
                font: {
                size: 20,
                style: "bold",
                weight: "600",
                },
                color: "#fff", // White text
                shadow: "#000",
            },
            angleLines: {
                color: "rgba(255, 255, 255, 0.30)", // Change angle line color
            },
            grid: {
                color: "rgba(255, 255, 255, 0.12)", // Change gridline color
            },
              backgroundColor: "rgba(0, 51, 15, 0.08)", // Set background color
            suggestedMin: 0,
            suggestedMax: 6,
            ticks: {
                // stepSize: 10, // Change grid spacing
                display: false, // Removes index numbers inside the chart
            },
        },
        },
        animation: {
            duration: 1500, // Slower animation
            easing: "easeInOutQuart", // Smooth transition
            easing: "easeOutBounce", // Bouncy effect
            animateDataset: true, // Animate datasets one by one
            
            
        },
    };



    return (
        <div style={{ width: "30rem", height: "30rem" }}> {/* Set smaller size */}
        <Radar data={data} options={options} />
        </div>
    );
};

export default RadarChart;