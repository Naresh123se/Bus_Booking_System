import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '85%',
      left: '55%',
      transform: 'translate(-50%, -50%)',
    }}>
      <Stack sx={{ color: '#009DF8' }} spacing={2} direction="row">
        <CircularProgress size={50} /> {/* Adjust size as needed */}
      </Stack>
    </div>
  );
};

export default Loader;
