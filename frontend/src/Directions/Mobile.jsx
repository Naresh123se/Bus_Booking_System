import React, { useState } from 'react';
import WeekendIcon from '@mui/icons-material/Weekend';
import Button from '@mui/joy/Button';

const Seat = ({ seatNumber, isBooked, selected, onSelect }) => (
  <button
    className={`p-2 m-1 relative ${selected ? 'text-[#009DF8]' : isBooked ? 'text-[#CC5500] cursor-not-allowed' : 'bg-gray-300 cursor-pointer'
      }`}
    onClick={() => onSelect(seatNumber)}
    disabled={isBooked}
  >
    {/* Icon */}
    <span className="">
      <WeekendIcon />
    </span>
    {/* Selection Indicator */}
    {selected && (
      <span className="">{/* ... */}</span>
    )}
  </button>
);

const BusSeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const bookedSeats = [3, 4, 10, 15]; // Update this array based on the seats that are already booked

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats(prevSeats => {
      if (prevSeats.includes(seatNumber)) {
        return prevSeats.filter(seat => seat !== seatNumber);
      } else {
        let newSeats = [...prevSeats, seatNumber];
        // Sort the seats numerically
        newSeats.sort((a, b) => a - b);
        return newSeats;
      }
    });
  };

  const handleFormSubmit = async () => {
    try {
      if (selectedSeats.length === 0) {
        // Show alert if no seats are selected
        alert('Please select at least one seat before submitting.');
        return;
      }
      
      const response = await fetch('http://localhost:5000/api/seat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedSeats),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Response from server:', data);
  
      if (!data.success) {
        // Display error message from the server in an alert
        alert(data.error);
      } else {
        // Optionally handle other scenarios, such as successful submission
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Optionally handle errors
    }
  };
  const [totalSeats, setTotalSeats] = useState(10); // Default total seats
  const selectedSeatCount = selectedSeats.length; // Count of selected seats
  const columns = totalSeats <= 20 ? 4 : 7;
  const rows = Array.from({ length: Math.ceil(totalSeats / columns) }, (_, i) => i + 1);
  
  return (
    <>
      <div className="flex">
        <div className="border ml-[30%] mt-[5%]">

        <div className='size-6 mt-2 ml-44'>
        <img src="steering.png" alt="steering" />
        </div>

          <div className="flex flex-col items-center">
            {rows.map(row => (
              <div key={row} className=" flex  " style={{ margin: '2px' }}> 
                {Array.from({ length: columns }, (_, i) => i + 1).map((column, index) => (
                  <React.Fragment key={column}>
                    <Seat
                      seatNumber={(row - 1) * columns + column}
                      isBooked={bookedSeats.includes((row - 1) * columns + column)}
                      selected={selectedSeats.includes((row - 1) * columns + column)}
                      onSelect={handleSeatSelect}
                    />
                    {/* Add space between columns */}
                    {index === columns / 2 - 1 && <div style={{ width: '30px' }} />}
                  </React.Fragment>
                ))}
                {row === 1 && <div className=" "></div>} {/* Adding space for the aisle after the first row */}
              </div>
            ))}
          </div>
        </div>
        <div className="border pl-2  mt-[5%] w-52">
          <div className="mt-3">
            <WeekendIcon  sx={{marginLeft:'5px'}}/> = available <br /> 
            <WeekendIcon  sx={{marginLeft:'5px', color:"#009DF8"}}/> = selected <br /> 
            <WeekendIcon  sx={{marginLeft:'5px', color:"#CC5500"}}/> = unavailable <br /> 
            Selected Seats: {selectedSeatCount} <br />
            Selected Seats number: {selectedSeatCount > 0 ? selectedSeats.join(', ') : ''}
          </div>
          <Button sx={{bgcolor:''}} className=" bg-blue-500 text-white rounded px-4 py-2 mt-4" onClick={() => setSelectedSeats([])}>
            Clear Selection
          </Button ><br />
          <Button sx={{marginTop:'10px'}} onClick={handleFormSubmit}>Submit</Button>
        </div>
      </div>
    </>
  );
};

export default BusSeatSelection;
