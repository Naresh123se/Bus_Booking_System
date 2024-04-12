import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function CustomizedSwitches() {
  const [value, setValue] = React.useState(false);

  const deleteData = async (id) => {
    try {
      console.log("ID:", id);
      
      // Add your deletion logic here
    } catch (error) {
      console.error('Error deleting data:', error);
      // Handle any errors that occur during the deletion process
    }
  };

  const handleChange = async (event) => {
    const newValue = event.target.checked;
    setValue(newValue);
    try {
      const response = await fetch('http://localhost:4000/api/users/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, value: newValue }),
      });
      if (!response.ok) {
        throw new Error('Failed to update value');
      }
      console.log(`Switch toggled to ${newValue}`);
      // Add your logic here to handle any UI updates if necessary
    } catch (error) {
      console.error('Error updating value:', error);
      // Add your error handling logic here
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Android12Switch checked={value} onChange={handleChange} />}
        label=""
      />
    </FormGroup>
  );
}
