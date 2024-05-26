import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { useGetTicketMutation } from '../slices/ticket'
import { useGetbusMutation } from '../slices/bus.js';
import { useBookingMailMutation} from '../slices/email';
import Button from '@mui/joy/Button';
const Ticket = () => {
  // Sample data for demonstration

  const [getbus] = useGetbusMutation();
  const [tickets, setTickets] = useState([]);
  const [tick, setTick] = useState([]);
  const [final, setFinal] = useState([]);
  const [bus, setBus] = useState([]);
  const [p, setP] = useState([]);
  const [cal, setCal] = useState([]);
  const [se, setSe] = useState([]);
  const [getTicket] = useGetTicketMutation();
  const storedValue = localStorage.getItem('user') || localStorage.getItem('userInfo');
  const userData = JSON.parse(storedValue);
  const userName = userData.displayName || userData.name;
  const email = userData.email || userData.email;
  const id = userData._id || userData._id;
  const [bookingMail] = useBookingMailMutation();
  const ticket1212 = localStorage.getItem('ticketDataResponse') 
  
  const all = localStorage.getItem('allData') 
  const userData1 = JSON.parse(all);
  const price1212 =  userData1.finalprice.totalPrice
  const BusName1212 =  userData1.BusName
  const bus1212 =  userData1.BusNumber
  const seatString =  userData1.seat
  const seat1212 = seatString.join(', ');

  console.log(seat1212)

  const [printingCompleted, setPrintingCompleted] = useState(false);

  // Simulate ticket printing completion after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setPrintingCompleted(true);
    }, 3000); // Change the delay time as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedResponse = localStorage.getItem('ticketDataResponse');
    const responseWithoutQuotes = storedResponse.slice(1, -1);
    console.log(storedResponse)
    const fetchAndFilterTickets = async () => {
      try {
        const response = await getTicket();
        console.log(response)
        const tickets = response.data.tickets;
        console.log(tickets)
        console.log(tickets[0].ticketNum)
        setTickets(tickets)
        console.log(responseWithoutQuotes)

        // Filter the tickets based on userId
        const filteredTickets = tickets.filter(ticket => ticket.ticketNum === responseWithoutQuotes);
        console.log(filteredTickets)

        console.log(filteredTickets[0].ticketNum)
        console.log(filteredTickets[0].finalprice.totalPrice)
        console.log(filteredTickets[0].SchId.calender)
        setTick(filteredTickets[0].ticketNum)
        setSe(filteredTickets[0].seat)
        setP(filteredTickets[0].finalprice.totalPrice)
        setCal(filteredTickets[0].finalprice.totalPrice)
        // Update the state with the filtered tickets
        setFinal(filteredTickets);
      } catch (error) {
        console.error('Error fetching or filtering tickets:', error);
      }
    };

    // Call the function to fetch and filter tickets when the component mounts or when the id changes
    fetchAndFilterTickets();
    fetchData();
  }, []); // Include id as a dependency to re-run the effect when it changes

  const emailSentFlag = localStorage.getItem('emailSent');
 
useEffect(() => {

  if (!emailSentFlag) {
    
    const sendEmail = async () => {
      
      try {
        
       
         bookingMail({  email, userName, ticket1212, BusName1212,price1212, bus1212, seat1212 }).unwrap();
      
        localStorage.setItem('emailSent', 'true');
      } catch (error) {
        console.error('Error sending email:', error);
      }
    };

    sendEmail();
  }
}, []);

  
  //buses
  const fetchData = async () => {
    try {
      const result = await getbus();
      const newData = result.data.data;
      // console.log(newData)

      // Set the reversed data in the state
      setBus(newData);

    } catch (error) {
      console.error('Failed to fetch schedules:', error);
    }
  };

  console.log(final)
  if (final.length > 0 && final[0].SchId) {
    console.log(final[0].SchId);
  } else {

  }


  const passengerData = {

    name: userName,
    email: email,
    Ticket: tick,
    Seat: se,
    Price: p,
    Date: cal,

  };
  console.log(final)


  // Format passenger data into a single string with labels
  const formattedData = Object.entries(passengerData)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  const printContent = () => {

    window.print();

  };

  return (
    <>
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


        <main className="ticket-system">
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
                      <div className='flex px-1 '>
                        <div className='w-full'>
                          <p className='text-xl font-semibold text-[#009DF8]'>{ticket.BusName}</p>
                          <div className='flex'>
                            <div>
                              <p >Ticket No : </p>
                            </div>

                            <div>
                              <p className='text-[#009DF8] ml-1'>{ticket.ticketNum}</p>
                            </div>
                          </div>
                          <div className='flex'>
                            <p className='pr-5'>Bus No </p>


                            <div className='text-[#009DF8]' >
                              : {ticket.BusNumber}
                            </div>
                          </div>                   </div>





                        <div>
                          <div className='grid  justify-items-end mb-1 ' >
                            <img src="3n.svg" alt="" className='size-16' />
                            <a href="mailto:merobus3@gmail.com" className='text-[#009DF8]  underline'>merobus3@gmail.com</a>

                          </div>
                          <div className='flex '>
                            <div className='w-full '>
                              <div>Journey Date:</div>
                              <div>Departure Time:</div>
                            </div>


                            <div className='w-40 grid justify-items-end'>
                              <div>{ticket.SchId.calender}</div>
                              <div>{ticket.SchId.startTime}</div>
                            </div>
                          </div>
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
                            <p className='text-md font-medium ml-24'>{ticket.SchId.startLocation}</p>

                          </div>

                        </div>
                        <div className='w-[60%] flex'>
                          <div>
                            <p>To:</p>

                          </div>

                          <div>
                            <p className='text-md font-medium'>{ticket.SchId.endLocation}</p>

                          </div>

                        </div>
                      </div>

                      <hr className='border-[#cbcbcb]' />
                      {/* 3rd */}
                      <div className='flex  justify-between px-2  '>


                        <div className='flex justify-end gap-10'>


                          <div className=' '>
                            <div>Name:</div>
                            <div>Email:</div>
                            <div>Phone No:</div>
                            <div>Seat No:</div>
                          </div>
                          <div>
                            <div>{passengerData.name}</div>
                            <div>{passengerData.email}</div>
                            <div>{ticket.contact.phoneNumber}</div>
                            <div>{ticket.seat.join(', ')}</div>

                          </div>
                        </div>

                        <div className='flex justify-end gap-10'>
                          <hr className=" w-24 text-[#cbcbcb] transform rotate-90  mr-96 mt-12 " />

                          <div className=''>
                            <div>No of Passenger:</div>
                            <div>Price:</div>
                            <div>Discount:</div>
                            <div>Total Price:
                            </div>
                          </div>

                          <div className=' grid justify-items-end'>
                            <div>{ticket.count}</div>
                            <div>{ticket.finalprice.price}</div>
                            <div>{ticket.finalprice.discount}</div>
                            <div>{ticket.finalprice.totalPrice}</div>
                          </div>
                        </div>
                      </div>



                    </div>


                  </div>
                ))}



                {/* {passengerInfoJSX} */}
              </div>
              <div className=" receipt  qr-code h-28 min-h-0 relative rounded-br-lg rounded-bl-lg rounded-tl-lg rounded-tr-lg flex items-center">


                {/* Generate QR code with formatted passenger data */}
                <div className='ml-10 '>
                  <QRCode value={formattedData} />

                </div>
                <div className="description ml-10">
                  {/* <h2>Boarding Pass</h2> */}
                  <p>Scan the QR code </p>
                </div>
                <div>

                </div>
                {/* <button onClick={printContent}>Print Content</button> */}
                <div cn>

                  <div className='ml-96'>
                    {/* Your content here */}

                    <Button onClick={printContent} style={{ className: 'button' }}>Print Content</Button>

                    <style>
                      {`
          @media print {
            button {
              display: none;
            }
          }
        `}
                    </style>
                  </div>



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
