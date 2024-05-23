import React, { useState } from 'react';

const buses = [
  { id: 1, time: '3:00', type: 'AC' },
  { id: 2, time: '7:00', type: 'Non-AC' },
  { id: 3, time: '13:00', type: 'Sleeper' },
  { id: 4, time: '19:00', type: 'Seater' },
  // Add more bus data as needed
];

const BusFilter = () => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedBusTypes, setSelectedBusTypes] = useState([]);

  const timeSlots = [
    { label: '1:00 - 6:00', value: '1-6' },
    { label: '6:00 - 12:00', value: '6-12' },
    { label: '12:00 - 18:00', value: '12-18' },
    { label: '18:00 - 24:00', value: '18-24' },
  ];

  const busTypes = ['AC', 'Non-AC', 'Sleeper', 'Seater'];

  const handleTimeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTimes((prev) =>
      checked ? [...prev, value] : prev.filter((t) => t !== value)
    );
  };

  const handleBusTypeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedBusTypes((prev) =>
      checked ? [...prev, value] : prev.filter((bt) => bt !== value)
    );
  };

  const applyFilters = () => {
    return buses.filter((bus) => {
      const busTime = parseInt(bus.time.split(':')[0]);
      const isTimeMatch =
        selectedTimes.length === 0 ||
        selectedTimes.some((time) => {
          const [start, end] = time.split('-').map(Number);
          return busTime >= start && busTime < end;
        });
      const isTypeMatch =
        selectedBusTypes.length === 0 || selectedBusTypes.includes(bus.type);
      return isTimeMatch && isTypeMatch;
    });
  };

  const filteredBuses = applyFilters();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Time Slots</h3>
        {timeSlots.map((slot) => (
          <div key={slot.value}>
            <input
              type="checkbox"
              id={slot.value}
              value={slot.value}
              onChange={handleTimeChange}
              className="mr-2"
            />
            <label htmlFor={slot.value}>{slot.label}</label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Bus Type</h3>
        {busTypes.map((type) => (
          <div key={type}>
            <input
              type="checkbox"
              id={type}
              value={type}
              onChange={handleBusTypeChange}
              className="mr-2"
            />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>

      <div id="busResults" className="mt-6">
        {filteredBuses.length > 0 ? (
          filteredBuses.map((bus) => (
            <p key={bus.id}>
              Bus ID: {bus.id}, Time: {bus.time}, Type: {bus.type}
            </p>
          ))
        ) : (
          <p>No buses match the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default BusFilter;
