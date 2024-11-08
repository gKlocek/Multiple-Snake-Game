import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Room {
    id: string;
    name: string;
}

const RoomList: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [newRoomName, setNewRoomName] = useState<string>('');
  
    const navigate = useNavigate();

    // Fetch rooms from the backend
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/rooms');
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched rooms: " + JSON.stringify(data));
          setRooms(data);
        } else {
          console.error('Failed to fetch rooms');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    // Handle adding a new room
    const addRoom = async () => {
      if (!newRoomName.trim()) return;
  
      try {
        const response = await fetch('http://localhost:8080/api/rooms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newRoomName }),
        });
  
        if (response.ok) {
          const newRoom = await response.json();
          console.log("Adding new room: " + newRoom);
          setRooms((prevRooms) => [...prevRooms, newRoom]);
          setNewRoomName(''); // Clear the input field
        } else {
          console.error('Failed to create room');
          const response_message = await response.json();
          throw new Error(JSON.stringify(response_message));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
  // Function to handle room click that loads game
  const handleRoomClick = async (name: String) => {
    try {
      const response = await fetch('http://localhost:8080/api/game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(name),
      });

      if (response.ok) {
        // const result = await response.text();
        navigate('/game'); // Navigate to RoomList after response
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
    // console.log(`Response message: ${JSON.stringify(responseMessage)}}`)
  };


    // Fetch rooms when the component mounts
    useEffect(() => {
      fetchRooms();
    }, []);
  
    return (
      <div>
        <h1>Room List</h1>
        <ul>
            Here we list all the rooms
          {rooms.map((room) => (
            <li key={room.id}>
              <button onClick={() => handleRoomClick(room.name)}>{room.name}</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="Enter room name"
        />
        <button onClick={addRoom}>Add Room</button>
      </div>
    );
  };
  
  export default RoomList;