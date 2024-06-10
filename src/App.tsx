import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './app/home/home';
import NotFound from './app/not-found/notFound';
import AirPollution from './app/air-pollution/air-pollution';
import PrecipitationProbability from './app/precipitation-probability/precipitation-probability';
import CurrentWheater from './app/current-wheater/current-wheater';

export default function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-50/50">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/home" Component={Home} />
            <Route path="/air-pollution" Component={AirPollution} />
            <Route path="/precipitation-probability" Component={PrecipitationProbability} />
            <Route path="/current-wheater" Component={CurrentWheater} />
            <Route path="*" Component={NotFound} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
