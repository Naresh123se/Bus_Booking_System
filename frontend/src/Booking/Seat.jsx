import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';


function App() {
  const [dateTime, setDateTime] = useState(dayjs()); // Set initial time to Nepal time

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(dayjs().tz('Asia/Kathmandu')); // Update date and time every second in Nepal time
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <p>Date and Time (Nepal): {dateTime.format('YYYY-MM-DD HH:mm:ss')}</p>
    </div>
  );
}

export default App;
