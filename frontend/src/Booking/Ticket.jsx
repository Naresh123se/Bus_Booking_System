import React, { useState } from 'react';

const BusBookingSystem = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatSelection = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  const renderSeats = () => {
    const totalSeats = 30; // Assuming there are 30 seats in the bus

    const seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      const isSeatSelected = selectedSeat === i;
      const seatClassName = isSeatSelected ? 'selected-seat' : 'available-seat';
      
      seats.push(
        <div
          key={i}
          className={seatClassName}
          onClick={() => handleSeatSelection(i)}
        >
          {i}
        </div>
      );
    }

    return seats;
  };

  return (
    <div className="bus-booking-system">
      <h2>Bus Booking System</h2>
      <div className="seats-container">
        {renderSeats()}
      </div>
      <div className="selected-seat-info">
        {selectedSeat && <p>Selected Seat: {selectedSeat}</p>}
      </div>
    </div>
  );
};

export default BusBookingSystem;
