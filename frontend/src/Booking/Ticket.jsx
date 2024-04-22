import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import {useGetTicketMutation} from '../slices/ticket'

const Ticket = () => {
  // Sample data for demonstration
  const [tickets, setTickets] = useState([]);
  const [final, setFinal] = useState([]);
  const [getTicket] = useGetTicketMutation();
  const storedValue = localStorage.getItem('user') || localStorage.getItem('userInfo');
  const userData = JSON.parse(storedValue);
  const userName = userData.displayName || userData.name;
  const email = userData.email || userData.email;
  const id = userData._id || userData._id;
  console.log(email)
  console.log(userName);
  console.log(id);
  
 console.log('User name:', userName);
  // Check if the value exists
  if (storedValue !== null) {
    // Value exists, use it
    console.log('Value from local storage:', storedValue);
  } else {
    // Value does not exist in local storage
    console.log('Value does not exist in local storage');
  }

  const [printingCompleted, setPrintingCompleted] = useState(false);

  // Simulate ticket printing completion after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setPrintingCompleted(true);
    }, 3000); // Change the delay time as needed

    return () => clearTimeout(timer);
  }, []);

  

    useEffect(() => {
      const fetchAndFilterTickets = async () => {
        try {
          // Fetch the tickets
          const response = await getTicket(); 
          console.log(response)// Fetch the tickets from your API
          const tickets = response.data.tickets;
          setTickets(tickets)
    

          // Filter the tickets based on userId
          const filteredTickets = tickets.filter(ticket => ticket.userId === id);
          console.log(filteredTickets)
    


          // Update the state with the filtered tickets
          setFinal(filteredTickets);
        } catch (error) {
          console.error('Error fetching or filtering tickets:', error);
        }
      };
    
      // Call the function to fetch and filter tickets when the component mounts or when the id changes
      fetchAndFilterTickets();
    },[]); // Include id as a dependency to re-run the effect when it changes
    


console.log(final)
if (final.length > 0 && final[0].SchId) {
  console.log(final[0].SchId.bus);
} else {
  
}



  const passengerData = {
    
    name: userName,
    email:email,
    Bus: "US6969",
    departure: "08/26/2018 15:33",
    gateCloses: "15:03",
    luggage: "Hand Luggage",
    seat: "69P"
  };

  // Format passenger data into a single string with labels
  const formattedData = Object.entries(passengerData)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');






  const printContent = () => {
    window.print();
  };
  
  return (
    <>
 
  
    <button onClick={printContent}>Print Content</button>
    <div id="contentToPrint">
      {/* <main  className="ticket-system"> */}



      <style>


        {`


@media print {
  body * {
    visibility: hidden;
  }
  #contentToPrint, #contentToPrint * {
    visibility: visible;
  }
}









          
        
          .ticket-system {
            max-width:full;
          
           
          }
                            
          .ticket-system .receipts {
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            transform: translateY(-510px);
            animation-duration: 2.5s;
            animation-delay: 500ms;
            animation-name: print;
            animation-fill-mode: forwards;
          }
          .ticket-system .receipts .receipt {
            padding: 25px 30px;
            text-align: left;
            min-height: 200px;
            width: 88%;
            background-color: #fff;
            border-radius: 10px 10px 20px 20px;
            box-shadow: 1px 3px 8px 3px rgba(0, 0, 0, 0.2);
          }
          
                             .receipts .receipt.qr-code::before {
            content: '';
            background: linear-gradient(to right, #fff 50%, #3f32e5 50%);
            background-size: 22px 4px, 100% 4px;
            height: 4px;
            width: 90%;
            display: block;
            left: 0;
            right: 0;
            top: -1px;
            position: absolute;
            margin: auto;
          }
         
                
          @keyframes print {
            0% {
              transform: translateY(-510px)
            }
            35% {
              transform: translateY(-395px);
            }
            70% {
              transform: translateY(-140px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>

 
      <main  className="ticket-system">
        {/* Your existing JSX */}
        <div className="flex items-center flex-col mb-14 ml-2 ">



       
  
    



        {!printingCompleted && (
            <>
              <h1 className="text-[#307094]  font-medium">Wait a second, your ticket is being printed</h1>
              <div className="w-[90%] h-3 border-2  border-[#cfc6c6] rounded-lg shadow-md bg-[#009DF8]"></div>
            </>
          )}

        {printingCompleted && (
            <>
 


<div>
  
</div>


              <h1 className="text-[#307094]  font-medium">{passengerData.name} Ticket here..</h1>
              <div className="w-[90%] h-3 border-2 border-[#cfc6c6] rounded-lg shadow-md bg-[#009DF8]"></div>
            </>
          )}
        </div>
        <div className="overflow-hidden mt-[-55px] pb-10 ml-4">
          <div className="receipts">
            <div className="receipt ">




              {/* main */}

              {final.map(ticket => (
             <div key={ticket._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          {/* <h3>Ticket ID: {ticket._id}</h3>
          <p>User ID: {ticket.userId}</p>
          <p>Schedule ID: {ticket.SchId._id}</p> */}
        
             
            <div className='  border border-[#cbcbcb] '>

{/* 1st */}
<div className='absolute opacity-20 grid items-center justify-items-end w-[60%] '>
    <img src="3.svg" alt="logo" className='size-96' />
</div>
<div className='flex px-2  '>
    <div className='w-full'>
        <p className='text-xl font-semibold text-[#009DF8]'>bus yatra</p>
        <div className='flex'>
            <div>
                <p >Ticket No : </p>
            </div>

            <div>
                <p className='text-[#009DF8] ml-1'>{ticket.ticketNum}</p>
            </div>
        </div>

        <p>Bus No :</p>

    </div>
    <div className='grid justify-items-end w-full'>
        <img src="3n.svg" alt="" className='size-16' />
        <a href="mailto:merobus3@gmail.com" className='text-[#009DF8]  underline'>merobus3@gmail.com</a>

        <p>Journey Date:{ticket.SchId.calender}</p>
        <p>Departure Time: {ticket.SchId.startTime}</p>
    </div>

</div>

{/* 2nd */}



<hr className='border-[#cbcbcb]' />

<div className='flex px-2' >
    <div className='w-full flex'>
        <div>
            <p>From:</p>

        </div>

        <div>
            <p className='text-md font-medium'>NEPAL</p>

        </div>

    </div>
    <div className='w-[60%] flex'>
        <div>
            <p>To:</p>

        </div>

        <div>
            <p className='text-md font-medium'>NEPAL</p>

        </div>

    </div>
</div>

<hr className='border-[#cbcbcb]' />
{/* 3rd */}
<div className='flex  px-2'>
    <div className='w-full'>
    <p className=''>
  Name: <span className="ml-20">{passengerData.name}</span>
</p>
    <p className=''>
    Boarding Point: <span className="ml-[16px]">{passengerData.name}</span>
</p>
    <p className=''>
    Phone No: <span className="ml-[50px]">{ticket.contact.phoneNumber}</span>
</p>
    <p className=''>
    Seat No: <span className="ml-16">{ticket.seat.join(', ')}</span>
</p>

    </div>
    <hr className="w-72  text-[#cbcbcb] transform rotate-90  mt-12 ml-96 " />
    <div className=' grid justify-items-end mr- w-full mr-10'>
      <div className='flex'>
      <p className=''>No of Passenger:</p>
         <p className='ml-1'>{ticket.count}</p>
      </div>
        <div className='flex'>
        <p className=''>Price:</p>
        <p className='ml-1'></p> 
        </div>
        <div className='flex'>
        <p className=''>Discount:</p>
        <p className='ml-1'></p>
        </div>
      <div className='flex'>
      <p className=''>Total Price:</p>
        <p className='ml-1'>{ticket.price}</p>
      </div>
    </div>
    <hr />
</div>

</div>

       
</div>
      ))}



              {/* {passengerInfoJSX} */}
            </div>
            <div className=" receipt  qr-code h-28 min-h-0 relative rounded-br-lg rounded-bl-lg rounded-tl-lg rounded-tr-lg flex items-center">


              {/* Generate QR code with formatted passenger data */}
              <QRCode value={formattedData} />
              <div className="description">
                <h2>Boarding Pass</h2>
                <p>Scan the QR code to board</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    </>
  );
}

export default Ticket;
