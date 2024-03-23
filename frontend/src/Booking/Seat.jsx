// src/Seat.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Seat() {
  const [buses, setBuses] = useState([]);
  const [newBusName, setNewBusName] = useState('');
  const [newBusType, setNewBusType] = useState('');
  const [newBusCapacity, setNewBusCapacity] = useState('');

  useEffect(() => {
    // Fetch all buses when component mounts
    axios.get('/api/ok/na')
      .then(response => {
        setBuses(response.data);
      })
      .catch(error => {
        console.error('Error fetching buses:', error);
      });
  }, []);

  const handleAddBus = () => {
    // Create a new bus
    axios.post('/api/ok/nar', {
      name: newBusName,
      type: newBusType,
      capacity: newBusCapacity
    })
    .then(response => {
      setBuses([...buses, response.data]); // Add new bus to the list
      setNewBusName('');
      setNewBusType('');
      setNewBusCapacity('');
    })
    .catch(error => {
      console.error('Error adding bus:', error);
    });
  };

  const handleDeleteBus = (id) => {
    console.log('Deleting bus with id:', id); // Log the id parameter
    // Delete a bus
    axios.delete(`/api/ok/busdel/${id}`)
      .then(() => {
        setBuses(buses.filter(bus => bus._id !== id)); // Remove deleted bus from the list
      })
      .catch(error => {
        console.error('Error deleting bus:', error);
      });
  };
  

  return (
    <div>
      <h1>Bus Management</h1>
      <h2>Add New Bus</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={newBusName} onChange={(e) => setNewBusName(e.target.value)} />
      </div>
      <div>
        <label>Type:</label>
        <input type="text" value={newBusType} onChange={(e) => setNewBusType(e.target.value)} />
      </div>
      <div>
        <label>Capacity:</label>
        <input type="number" value={newBusCapacity} onChange={(e) => setNewBusCapacity(e.target.value)} />
      </div>
      <button onClick={handleAddBus}>Add Bus</button>

      <h2>All Buses</h2>
      <ul>
        {buses.map(bus => (
          <li key={bus._id}>
            {bus.name} - {bus.type} - {bus.capacity}
            <button onClick={() => handleDeleteBus(bus._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Seat;
