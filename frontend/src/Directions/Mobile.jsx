


// import React from 'react'

// const Mobile = () => {
//   return (

//     <div>
//     <div className='bg-[red] '>Mobile</div>
//     <div className='bg-[#bd9a9a]'>Mobile</div>
//     <div className='bg-[yellow]'>Mobile</div>
//     </div>
//   )
// }

// export default Mobile


import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
  return (
    <Box sx={{ width: 960 ,marginLeft:32 }}>
      <Skeleton height={265} sx={{ marginY:-7 }} />
      <Skeleton animation="wave" height={265} sx={{ marginY: -11 }} />
      <Skeleton animation={false} height={265} sx={{ marginY: -11 }} />
    </Box>
  );
}


