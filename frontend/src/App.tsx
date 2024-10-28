import './App.css';
import RoomList from './components/RoomList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route displays Home */}
        <Route path="/" element={<Home />} />
        {/* Route to display RoomList */}
        <Route path="/rooms" element={<RoomList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
