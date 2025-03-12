import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import DoughnutChart from './components/DoughnutChart';
import RadarChart from './components/RadarGraph';
import MusicBarChart from './components/musicbarchart';
import { Container, Card, Row, Col } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-#1b1e21 flex items-center justify-center">
      <nav className="navbar">
        <div className="nav-left">Replay 25</div>
        <div className="nav-right">Bug Squashers</div>
  </nav>
  <div className='mainH1'>
  <h1>Your Music Wrapped</h1>
  </div>

  
  <div className='barChart'>
        <MusicBarChart />
        
      </div>


      

<div className='mainRadar'>
      <div className='radarWrapper'>
          <div className='radarChart'>
        <h1>Top Genres</h1>
            <RadarChart />
          </div>
      </div>
      <div className="app-container">
      <DoughnutChart /> {/* h1 is now inside DoughnutChart */}
    </div>
      </div>
      
      <br/>

      </div>
  );
}

export default App;
