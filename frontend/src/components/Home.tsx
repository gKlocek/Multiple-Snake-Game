import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  // State to store the input value and the displayed name
  const [name, setName] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const navigate = useNavigate();
  // Function to handle the change in the input field
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // Function to handle the button click and display the name
  const handleButtonClick = async () => {
    setDisplayName(name);
    console.log(`Got name: ${name}`)

    try {
      const response = await fetch('http://localhost:8080/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(name),
      });

      if (response.ok) {
        const result = await response.text();
        setResponseMessage(result);
        navigate('/rooms'); // Navigate to RoomList after response
      } else {
        setResponseMessage('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred');
    }
    
    console.log(`Response message: ${JSON.stringify(responseMessage)}}`)
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Enter Your Name</h1>
      <input
        type="text"
        value={name}
        onChange={handleInputChange}
        placeholder="Type your name"
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <br />
      <button
        onClick={handleButtonClick}
        style={{ padding: '10px 20px', marginTop: '10px', fontSize: '16px' }}
      >
        Enter
      </button>
      <div style={{ marginTop: '20px' }}>
        {displayName && <h2>Hello, {displayName}!</h2>}
      </div>

    </div>
  );
}

export default Home;
