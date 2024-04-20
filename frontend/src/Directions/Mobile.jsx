// import React from 'react';

// class TicketGenerator extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       ticketNumber: this.generateTicketNumber()
//     };
//   }

//   generateTicketNumber() {
//     // Generate a random number as a ticket number
//     const ticket =  Math.floor(Math.random() * 1000000);
//     return `MB${ticket}`; // Generate a random number as a ticket number, and add the id of this component to it so that each generated ticket has its own unique ID. This is done in order for us to be able to use the same ticket number multiple times on different components without any problems arising from the fact that we are using the same ticket number twice at the same time.


//   }

//   render() {
//     return (
//       <div>
//         <h2>Ticket Number: {this.state.ticketNumber}</h2>
//         {/* <button onClick={() => this.setState({ ticketNumber: this.generateTicketNumber() })}>
//           Generate New Ticket Number
//         </button> */}
//       </div>
//     );
//   }
// }

// export default TicketGenerator;


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

