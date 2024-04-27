import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 60px;
`;

export default function InputSlider() {
  const [time22, setTime22] = React.useState(0); // Initial value set to 0 (5:00 AM)

  const handleSliderChange = (event, newValue) => {
    setTime22(newValue);
  };

  const handleInputChange = (event) => {
    setTime22(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (time22 < 0) {
      setTime22(0);
    } else if (time22 > 47) { // Maximum value changed to 47 (23:30)
      setTime22(47);
    }
  };

  // Convert the value to time format (00:00 to 23:30)
  const valueToTime = (value) => {
    const hours = Math.floor(value / 2); // Hours
    const minutes = value % 2 === 0 ? '00' : '30'; // Every half-hour interval
    return `${String(hours).padStart(2, '0')}:${minutes}`; // Pad single-digit hours with leading zero
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Time
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof time22 === 'number' ? time22 : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            step={1} // Step set to 1
            min={1} // Minimum value set to 0
            max={47} // Maximum value set to 47
          />
        </Grid>
        <Grid item>
          <Input
            value={valueToTime(time22)}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 47,
              type: 'text',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
