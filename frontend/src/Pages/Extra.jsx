import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@mui/material/TextField';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange1 = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>Select a Date:</h1>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange1}
        customInput={
          <TextField
            sx={{ width: '10.58cm' }}
            label="Departure"
            className="border border-1"
            InputProps={{
              startAdornment: <CalendarTodayIcon />,
            }}
          />
        }
      />
    </div>
  );
}

export default MyComponent;
