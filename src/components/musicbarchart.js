import React, { useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const MusicBarChart = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dataValues = [10, 5, 4, 16, 15.2, 9, 11];
  const maxValue = 20;

  const transparentData = labels.map((_, i) =>
    selectedDay === i ? maxValue - dataValues[i] : 0
  );

  const musicData = {
    labels,
    datasets: [
      {
        label: 'Listening Hours',
        data: dataValues,
        backgroundColor: '#88f52e', 
        stack: 'stack1',
        barThickness: 40,
        borderRadius: 20,
        borderSkipped: false
      },
      {
        label: 'Max Container',
        data: transparentData,
        backgroundColor: selectedDay !== null ? 'rgba(255,255,255,0.1)' : 'transparent',
        stack: 'stack1',
        barThickness: 40,
        borderRadius: {
          topLeft: 20,
          topRight: 20
        },
        borderSkipped: false
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    
    onClick: (e, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedDay(index === selectedDay ? null : index); // toggle
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: '#ffffff',
          font: { size: 14 }
        },
        grid: { display: false }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: maxValue,
        ticks: {
          color: '#ffffff',
          font: { size: 12 },
          callback: (value) => `${value}h`
        },
        
      }
    }
  };

  const getTimeString = (value) => {
    const hours = Math.floor(value);
    const minutes = Math.round((value % 1) * 60);
    return `${hours}h ${minutes > 0 ? minutes + ' min' : ''}`;
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card bg="dark" text="light" color='#88f52e' className="shadow-lg p-3 rounded">
            <Card.Body>
              <Card.Title className="text-center text-white mb-4">
              Hours of Listening Per Day
              </Card.Title>

              {selectedDay !== null && (
                <div className="text-center text-white mb-3 fs-6 fw-bold">
                {labels[selectedDay]}:{' '}
                <span style={{ color: '#88f52e' }}>{getTimeString(dataValues[selectedDay])}</span>
              </div>
              
              )}

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
