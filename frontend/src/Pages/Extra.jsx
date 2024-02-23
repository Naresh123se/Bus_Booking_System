import React, { useState } from 'react';

const Seat = ({ number, isBooked, selected, onSelect }) => {
  let seatClass = 'bg-gray-300 cursor-pointer';
  if (isBooked) {
    seatClass = 'bg-orange-500 cursor-not-allowed';
  } else if (selected) {
    seatClass = 'bg-green-500';
  }

  return (
    <button 
      className={`p-2 m-1 ${seatClass}`} 
      onClick={() => onSelect(number)}
      disabled={isBooked}
    >
      {number}
    </button>
  );
};

const Extra = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const bookedSeats = [3, 4, 5, 10, 15]; // Update this array based on the seats that are already booked

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats(prevSeats => {
      if (prevSeats.includes(seatNumber)) {
        return prevSeats.filter(seat => seat !== seatNumber);
      } else {
        return [...prevSeats, seatNumber];
      }
    });
  };

  const rows = Array.from({ length: 5 }, (_, i) => i + 1);
  const columns = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center">
      {rows.map(row => (
        <div key={row} className="flex justify-center">
          {columns.map(column => {
            const seatNumber = (row - 1) * columns.length + column;
            const isBooked = bookedSeats.includes(seatNumber);
            return (
              <Seat 
                key={seatNumber} 
                number={seatNumber} 
                isBooked={isBooked}
                selected={selectedSeats.includes(seatNumber)} 
                onSelect={handleSeatSelect} 
              />
            );
          })}
        </div>
      ))}
      <button className="bg-blue-500 text-white rounded px-4 py-2 mt-4" onClick={() => setSelectedSeats([])}>Clear Selection</button>
    </div>
  );
};

export default Extra;
