// App.js
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useAddMutation, useGetScheduleMutation, useEditScheduleMutation, useDeleteScheduleMutation } from '../slices/busSchedules.js';
function Ticket() {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bus, setBus] = useState('');

  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [price, setPrice] = useState('');
  const [add] = useAddMutation();
  useEffect(() => {
    // Fetch all buses when the component mounts
    axios.get('/api/bus/bus11')
      .then(response => {
        setBuses(response.data);
        console.log(buses)
      })
      .catch(error => {
        console.error('Error fetching buses:', error);
      });
  }, []);

  // const handleCreateSchedule = () => {
  //   // Create a new schedule
  //   axios.post('/api/bus/schedules', {
  //     busId: selectedBus,
  //     startTime,
  //     endTime
  //   })
  //   .then(response => {
  //     console.log('Schedule created:', response.data);
  //     // Clear input fields after successful creation
  //     setSelectedBus('');
  //     setStartTime('');
  //     setEndTime('');
  //   })
  //   .catch(error => {
  //     console.error('Error creating schedule:', error);
  //   });
  // };

  const handleCreateSchedule = async (event) => {
    event.preventDefault();
    const { bus, startTime, endTime, startLocation, endLocation, price } = event.target.elements;
    try {
      const response = await add({
        selectedBus: bus.value,
        startTime: startTime.value,
        endTime: endTime.value,
        startLocation: startLocation.value,
        endLocation: endLocation.value,
        price: price.value
      }).unwrap();

      // Update local state with the newly added item
      // addData(response.data);

      // Show success message
      toast.success('Data added successfully');
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || err.error);
    }
  };





  const currentDate = new Date().toISOString().split('T')[0];
  return (
    <div>
      <h1>Bus Schedule App</h1>
      <h2>Create Schedule</h2>
      <div>
        <label>Select Bus:</label>
        <select name="bus" defaultValue="">
    <option value="" disabled>Select a bus</option>
    {buses.map(bus => (
      <option key={bus._id} value={bus._id}>{bus.name1}</option>
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
