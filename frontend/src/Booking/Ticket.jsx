// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ticket() {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    // Fetch all buses when the component mounts
    axios.get('/api/bus/bus11')
      .then(response => {
        setBuses(response.data);
      })
      .catch(error => {
        console.error('Error fetching buses:', error);
      });
  }, []);

  const handleCreateSchedule = () => {
    // Create a new schedule
    axios.post('/api/bus/schedules', {
      busId: selectedBus,
      startTime,
      endTime
    })
    .then(response => {
      console.log('Schedule created:', response.data);
      // Clear input fields after successful creation
      setSelectedBus('');
      setStartTime('');
      setEndTime('');
    })
    .catch(error => {
      console.error('Error creating schedule:', error);
    });
  };
  const currentDate = new Date().toISOString().split('T')[0];
  return (
    <div>
      <h1>Bus Schedule App</h1>
      <h2>Create Schedule</h2>
      <div>
        <label>Select Bus:</label>
        <select value={selectedBus} onChange={e => setSelectedBus(e.target.value)}>
          <option value="">Select a bus</option>
          {buses.map(bus => (
            <option key={bus._id} value={bus._id}>{bus.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Start Time:</label>
        <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} required />
      </div>
      <div>
        <label>End Time:</label>
        <input type="date" value={endTime} min= {currentDate} onChange={e => setEndTime(e.target.value)} required />

        
      </div>
      <button onClick={handleCreateSchedule}>Create Schedule</button>
    </div>
  );
}

export default Ticket;
