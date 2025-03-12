import logo from './logo.svg';
import DoughnutChart from './components/DoughnutChart';
import RadarChart from './components/RadarGraph';
import './App.css';

function App() {
  return (
    <div className='app-container'>
      <h1>Top Artists</h1>
        <DoughnutChart />
      <div className='mainRadar'>
      <div className='radarWrapper'>
        <h1>Top Genres</h1>
          <div className='radarChart'>
            <RadarChart />
          </div>
      </div>
      </div>
    </div>
  );
}

export default App;
