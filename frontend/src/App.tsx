import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  const fetchHelloMessage = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/hello');
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchHelloMessage();
  }, []); // Fetch message on component mount

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
