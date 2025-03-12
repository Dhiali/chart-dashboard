// Import necessary React and Bootstrap components
import React, { useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

// Import Bar chart component and required chart.js elements
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title
} from 'chart.js';

// Register the chart.js components used in this chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

// Main functional component
const MusicBarChart = () => {
  // Track which day has been clicked/selected
  const [selectedDay, setSelectedDay] = useState(null);

  // Define x-axis labels
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Define listening time (in hours) per day
  const dataValues = [10, 5, 4, 16, 15.2, 9, 11]; // Static data

  // Define the max value of the y-axis
  const maxValue = 20;

  /**
   * TransparentData is a helper dataset to show a semi-transparent "container bar" on the chart. This container
   * only becomes visible when a bar is clicked. It visually represents the full height of the bar (20h), 
   * with the colored bar filling the actual data value inside it.
   */
  const transparentData = labels.map((_, i) =>
    selectedDay === i ? maxValue - dataValues[i] : 0
  );

  // Chart data configuration with two datasets (stacked bars)
  const musicData = {
    labels,
    datasets: [
      {
        label: 'Listening Hours',
        data: dataValues, // Actual hours listened
        backgroundColor: '#88f52e', // Bright green color
        stack: 'stack1', // Stacks with transparent bar
        barThickness: 40,
        borderRadius: 20,
        borderSkipped: false
      },
      {
        label: 'Max Container',
        data: transparentData, // Only appears for day selected 
        backgroundColor: selectedDay !== null ? 'rgba(255,255,255,0.1)' : 'transparent',
        stack: 'stack1', // Stack on same axis
        barThickness: 40,
        borderRadius: {
          topLeft: 20,
          topRight: 20
        },
        borderSkipped: false
      }
    ]
  };

  // Chart configuration options
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    // When a bar is clicked, update selectedDay to show the filled background bar
    onClick: (e, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedDay(index === selectedDay ? null : index); // Toggle logic
      }
    },

    // Chart axis settings
    scales: {
      x: {
        stacked: true, // Stack the bars on x-axis
        ticks: {
          color: '#ffffff', // White x-axis labels
          font: { size: 14 }
        },
        grid: { display: false }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: maxValue, // max value set for consistent bar height
        ticks: {
          color: '#ffffff',
          font: { size: 12 },
          callback: (value) => `${value}h` // Format y-axis as hours
        }
      }
    }
  };

  // Utility function to format time from decimal to hours + minutes
  const getTimeString = (value) => {
    const hours = Math.floor(value);
    const minutes = Math.round((value % 1) * 60);
    return `${hours}h ${minutes > 0 ? minutes + ' min' : ''}`;
  };

  // JSX layout for rendering the chart and selected time
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          {/* Card wrapper for the bar chart */}
          <Card bg="dark" text="light" color='#88f52e' className="shadow-lg p-3 rounded">
            <Card.Body>
              {/* Chart title */}
              <Card.Title className="text-center text-white mb-4">
                Hours of Listening Per Day
              </Card.Title>

              {/* If a bar is selected, show that day's total listening time */}
              {selectedDay !== null && (
                <div className="text-center text-white mb-3 fs-6 fw-bold">
                  {labels[selectedDay]}:{' '}
                  <span style={{ color: '#88f52e' }}>{getTimeString(dataValues[selectedDay])}</span>
                </div>
              )}

              {/* Bar chart container */}
              <div style={{ height: '350px' }}>
                <Bar data={musicData} options={options} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MusicBarChart;
