import React, { useState } from 'react';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';

const Seat = ({ isBooked, selected, onSelect }) => (
  <button 
    className={`p-2 m-1 relative ${selected ? 'bg-[#009DF8]' : isBooked ? 'bg-[#CC5500] cursor-not-allowed' : 'bg-gray-300 cursor-pointer'}`} 
    onClick={onSelect}
    disabled={isBooked}
  >
    {/* Icon */}
    <span className="">
      <AirlineSeatReclineNormalIcon />
    </span>
    {/* Selection Indicator */}
    {selected && (
      <span className="">
       
      </span>
    )}
  </button>
)

const BusSeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const bookedSeats = [3, 4, 10, 15]; // Update this array based on the seats that are already booked

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats(prevSeats => {
      if (prevSeats.includes(seatNumber)) {
        return prevSeats.filter(seat => seat !== seatNumber);
      } else {
        return [...prevSeats, seatNumber];
      }
    });
  };

  const selectedSeatCount = selectedSeats.length; // Count of selected seats

  const rows = Array.from({ length: 3 }, (_, i) => i + 1);
  const columns = Array.from({ length: 4 }, (_, i) => i + 1); // Reduced the number of columns to 4 to represent a typical bus layout

  return (
    <>
    <div className='border  mx-[40%] mt-[10%]'>
    <div className="flex flex-col items-center ">
      {rows.map(row => (
        <div key={row} className="flex justify-center">
          {columns.map(column => {
            const seatNumber = (row - 1) * columns.length + column;
            const isBooked = bookedSeats.includes(seatNumber);
            return (
              
              <Seat 
                key={seatNumber} 
                isBooked={isBooked}
                selected={selectedSeats.includes(seatNumber)} 
                onSelect={() => handleSeatSelect(seatNumber)} 
              />
            );
          })}
          {row === 1 && <div className="w-4"></div>} {/* Adding space for the aisle after the first row */}
        </div>
      ))}
      <div className="mt-4">
        Selected Seats: {selectedSeatCount}
      </div>
      <button className="bg-blue-500 text-white rounded px-4 py-2 mt-4" onClick={() => setSelectedSeats([])}>Clear Selection</button>
    </div>
    </div>
</>
  );
};


export default BusSeatSelection;
