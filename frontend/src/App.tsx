import './App.css';
import RoomList from './components/RoomList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route displays Home */}
        <Route path="/" element={<Home />} />
        {/* Route to display RoomList */}
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/game" element={<Game/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
