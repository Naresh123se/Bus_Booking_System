import React from 'react'

const BusSeatSelection = () => {
  return (
    <div>BusSeatSelection</div>
  )
}

export default BusSeatSelection







// import React, { useEffect, useState } from 'react';
// import WeekendIcon from '@mui/icons-material/Weekend';
// import Button from '@mui/joy/Button';
// import { ToastContainer, toast } from 'react-toastify';
// import { useSeatMutation } from '../slices/seat';
// import CancelIcon from '@mui/icons-material/Cancel';

// const Seat = ({ seatNumber, isBooked, selected, onSelect }) => (
//   <button
//     className={`p-2 m-1 relative ${selected ? 'text-[#009DF8]' : isBooked ? 'text-[#CC5500] cursor-not-allowed' : 'bg-gray-300 cursor-pointer'
//       }`}
//     onClick={() => onSelect(seatNumber)}
//     disabled={isBooked}
//   >
//     {/* Icon */}
//     <span className="">
//       <WeekendIcon />
//     </span>
//     {/* Selection Indicator */}
//     {selected && (
//       <span className="">{/* ... */}</span>
//     )}
//   </button>
// );

// const BusSeatSelection = () => {
//   const [selectedSeats, setSelectedSeats] = useState([]);
//  // Update this array based on the seats that are already booked
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [seat] = useSeatMutation();
//   const [showSeat, setShowSeat] = useState(false);
//   const [seatData, setSeatData] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/seatget')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setSeatData(data);
//       })
//       .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//       });
//   }, [1]); 
//   const [data, setData] = useState([]);
//   const result = showSeat.data;
//   console.log(result)
//   const bookedSeats = [2, 3, 4, 10]; 
//   // console.log(seatData)
//   const handleSeatSelect = (seatNumber) => {
//     setSelectedSeats((prevSeats) => {
//       if (prevSeats.includes(seatNumber)) {
//         return prevSeats.filter((seat) => seat !== seatNumber);
//       } else {
//         let newSeats = [...prevSeats, seatNumber];
//         // Sort the seats numerically
//         newSeats.sort((a, b) => a - b);
//         return newSeats;
//       }
//     });
//   };

//   const handleClearSelection = () => {
//     setSelectedSeats([]);
//     localStorage.removeItem('selectedSeats');
//   };

//   // Inside the handleFormSubmit function
//   const handleFormSubmit = async () => {
//     try {
//       setIsSubmitting(true);

//       const response = await seat(selectedSeats);

//       if (response.error) {
//         toast.error(response.error.data.message);
//       } else if (response.data) {
//         // Display success toast only if there's data
//         toast.success(response.data.message);
//         // Store selected seats in local storage
//         localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
//       }
//     } catch (error) {
//       toast.error(error.message || err.error);
//       // Remove selected seats from local storage on failure
//       localStorage.removeItem('selectedSeats');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Retrieve selected seats from local storage on component mount
//   useEffect(() => {
//     const storedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
//     if (storedSeats) {
//       setSelectedSeats(storedSeats);
//     }
//   }, []);

//   const selectedSeatCount = selectedSeats.length; // Count of selected seats

//   const rows = Array.from({ length: 6 }, (_, i) => i + 1);
//   const columns = Array.from({ length: 4 }, (_, i) => i + 1); // Reduced the number of columns to 4 to represent a typical bus layout

//   return (
//     <>
//     <div className=''>
//     <Button   onClick={() => setShowSeat(prev => !prev)}> {showSeat ? "X" : "Show Seats"} </Button>
//     </div>
     
//       {
//         showSeat &&
//         <div className='    '>
//           <ToastContainer />
//           <div className="flex">
//             <div className="border ">
//               <div className='size-6 mt-2 ml-44'>
//                 <img src="steering.png" alt="steering" />
//               </div>
//               <div className="flex flex-col items-center">
//                 {rows.map((row) => (
//                   <div key={row} className=" flex  " style={{ margin: '2px' }}>
//                     {columns.map((column, index) => (
//                       <React.Fragment key={column}>
//                         <Seat
//                           seatNumber={(row - 1) * columns.length + column}
//                           isBooked={bookedSeats.includes((row - 1) * columns.length + column)}
//                           selected={selectedSeats.includes((row - 1) * columns.length + column)}
//                           onSelect={handleSeatSelect}
//                         />
//                         {/* Add space between columns */}
//                         {index === columns.length / 2 - 1 && <div style={{ width: '30px' }} />}
//                       </React.Fragment>
//                     ))}
//                     {row === 1 && <div className=" "></div>} {/* Adding space for the aisle after the first row */}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="border pl-4   w-auto">
//               <div className="mt-3   l-20 mr-[20px]">
//                 <WeekendIcon sx={{ marginLeft: '5px' }} /> = available <br />
//                 <WeekendIcon sx={{ marginLeft: '5px', color: '#009DF8' }} /> = selected <br />
//                 <WeekendIcon sx={{ marginLeft: '5px', color: '#CC5500' }} /> = unavailable <br />
//                 Selected Seats: {selectedSeatCount} <br />
//                 Selected Seats number: {selectedSeatCount > 0 ? selectedSeats.join(', ') : ''}
//               </div>
//               <Button sx={{ marginTop:'10px', bgcolor:'#422bd6'}} onClick={handleClearSelection}>
//                 Clear 
//               </Button>
//               <br />
//               <Button sx={{ marginTop: '10px' }} onClick={handleFormSubmit} disabled={isSubmitting}>
//                 Submit
//                 {/* {isLoading ? 'Submitting...' : 'Submit'} */}
//               </Button>
//             </div>
//           </div>
//         </div>
//       }
//     </>
//   );
// };

// export default BusSeatSelection;



