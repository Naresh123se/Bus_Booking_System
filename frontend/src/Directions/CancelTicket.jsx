import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import QRCode from 'qrcode.react';
import { useGetTicketMutation } from '../slices/ticket';
import { useCancelMailMutation, useCancelMutation} from '../slices/email';
import Button from '@mui/joy/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import Loader from '../Directions/Loader';

const CancelTicket = () => {
  const [date, setDate] = useState();
  const [ticket1, setTicket1] = useState('');
  const [mobile, setMobile] = useState('');
  const [tickets, setTickets] = useState([]);
  const [tick, setTick] = useState([]);
  const [final, setFinal] = useState([]);
  const [p, setP] = useState([]);
  const [userName, setUserName] = useState([]);
  const [email, setEmail] = useState([]);
  const [cal, setCal] = useState([]);
  const [bus, setBus] = useState([]);
  const [se, setSe] = useState([]);
  const [busId, setBusId] = useState([]);
  const [getTicket] = useGetTicketMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [noRecord, setNoRecord] = useState(false);
  const [emailCancel, {isLoading}] = useCancelMailMutation();
  const [cancelTicket] = useCancelMutation();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchLocalData = () => {
      const today = new Date();
      today.setDate(today.getDate() + 1);
      const localData = today.toISOString().split('T')[0];
      setDate(localData);
    };
    fetchLocalData();
  }, []);

  const fetchAndFilterTickets = async (event) => {
    event.preventDefault();
    setIsOpen(false);
    setNoRecord(false);
    try {
      const response = await getTicket();
      console.log(response);
      const tickets = response.data.tickets;
      setTickets(tickets);
      const filteredTickets = tickets.filter(ticket => {
        return ticket.ticketNum === ticket1 && ticket.contact.phoneNumber === mobile && ticket.SchId.calender === date;
      });
      setBusId(filteredTickets);
      if (filteredTickets.length > 0) {
        const ticket = filteredTickets[0];
        setTick(ticket.ticketNum);
        setSe(ticket.seat);
        setP(ticket.finalprice.totalPrice);
        setCal(ticket.SchId.calender);
        setUserName(ticket.userId.name);
        setEmail(ticket.userId.email);
        setBus(ticket.BusNumber);
        setFinal(filteredTickets);
        setIsOpen(true);
      } else {
        setNoRecord(true);
      }
    } catch (error) {
      console.error('Error fetching or filtering tickets:', error);
    }
  };

  const passengerData = {
    name: userName,
    email: email,
    Ticket: tick,
    Seat: se,
    Price: p,
    Date: cal,
    BusNumber: bus,
  };

  const formattedData = Object.entries(passengerData)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  const CancelNow = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!"
    });

    if (result.isConfirmed) {
      try {
        await deleteTicket(id);
        await emailCancel({ email, cal, se, p, tick, userName, bus }).unwrap();
        Swal.fire({
          title: "Canceled!",
          text: "Your Ticket has been canceled.",
          icon: "success"
        }).then(() => { // Corrected arrow function syntax
          navigate('/');
        });
      } catch (error) {
        console.error(error);
        
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Handle cancel action if needed
    }
    
  };

  const deleteTicket = async (id) => {
    try {
      console.log("Deleting ticket with ID:", id);
      const response = await cancelTicket(id);
      if (response.error) {
        throw new Error(response.error.message || 'Failed to delete Ticket');
      }
      // Update local state to remove the deleted ticket
      setTickets(prevTickets => prevTickets.filter(item => item._id !== id));
      // toast.success('Ticket deleted successfully');
    } catch (error) {
      console.error('Failed to delete Ticket:', error);
      toast.error(error.message || 'Failed to delete Ticket');
    }
  };
  
  return (
    <>
      <div className='ml-60 mt-3 '>
        <div className=''>
          <h1 className='font-semibold text-[20px]'>Search Ticket</h1>
          {isLoading && <Loader />}
        </div>
        <h3 className='text-[#9e7171] '>Note: Please be advised that tickets for today's
        trip date cannot be canceled</h3>
        <div className='w-full gap-5 mt-1 flex '>
          <form onSubmit={fetchAndFilterTickets} className='flex gap-2 mt-1'>
            <div>
              <h2>Ticket Number</h2>
              <TextField
                label="Ticket Number..."
                name="textInput"
                type='text'
                placeholder='Your ticket number'
                size='small'
                required={true}
                value={ticket1}
                onChange={(e) => setTicket1(e.target.value)}
              />
            </div>
            <div>
              <h2>Mobile Number</h2>
              <TextField
                label="Mobile Number..."
                name="textInput"
                type='number'
                placeholder='Your mobile number'
                size='small'
                required={true}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div>
              <h2>Trip Date</h2>
              <TextField
                type="date"
                size='small'
                required={true}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                  inputProps={{ min: date }}
              />
            </div>
            <div className='mt-7 '>
              <Button type='submit'>Search</Button>
            </div>
          </form>
        </div>
      </div>
      {noRecord &&
        <div className='grid justify-center mt-40'>
          <div className='ml-5'><img src="Seat.svg" alt="logo" /></div>
          <div>
            <p className='font-bold text-[20px]'>Oops! No Ticket found.</p>
            <p className='ml-5'>Oops! No Ticket found.</p>
          </div>
        </div>
      }
      {isOpen && (
        <div id="contentToPrint">
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
                max-width: full;
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
            <div className="flex items-center flex-col mb-14 ml-2">
              <>
                <h1 className="text-[#307094] font-medium">{passengerData.name} Your Ticket Here..</h1>
                <div className="w-[90%] h-3 border-2 border-[#cfc6c6] rounded-lg shadow-md bg-[#009DF8]"></div>
              </>
            </div>
            <div className="overflow-hidden mt-[-55px] pb-10 ml-4">
              <div className="receipts">
                <div className="receipt">
                  {final.map(ticket => (
                    <div key={ticket._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                      <div className='border border-[#cbcbcb]'>
                        <div className='absolute opacity-20 grid items-center justify-items-end w-[60%]'>
                          <img src="3.svg" alt="logo" className='size-96' />
                        </div>
                        <div className='flex px-1'>
                          <div className='w-full'>
                            <p className='text-xl font-semibold text-[#009DF8]'>{ticket.BusName}</p>
                            <div className='flex'>
                              <div>
                                <p>Ticket No :</p>
                              </div>
                              <div>
                                <p className='text-[#009DF8] ml-1'>{ticket.ticketNum}</p>
                              </div>
                            </div>
                            <div className='flex'>
                              <p className='pr-5'>Bus No</p>
                              <div className='text-[#009DF8]'>
                                : {ticket.BusNumber}
                              </div>
                            </div>
                            <div><p>{ticket.SchId.bus.name1}</p></div>
                          </div>
                          <div>
                            <div className='grid justify-items-end mb-1'>
                              <img src="3n.svg" alt="" className='size-16' />
                              <a href="mailto:merobus3@gmail.com" className='text-[#009DF8] underline'>merobus3@gmail.com</a>
                            </div>
                            <div className='flex'>
                              <div className='w-full'>
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
                        <hr className='border-[#cbcbcb]' />
                        <div className='flex px-2'>
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
                        <div className='flex justify-between px-2'>
                          <div className='flex justify-end gap-10'>
                            <div>
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
                            <hr className="w-24 text-[#cbcbcb] transform rotate-90 mr-96 mt-12" />
                            <div>
                              <div>No of Passenger:</div>
                              <div>Price:</div>
                              <div>Discount:</div>
                              <div>Total Price:</div>
                            </div>
                            <div className='grid justify-items-end'>
                              <div>{ticket.count}</div>
                              <div>{ticket.finalprice.price}</div>
                              <div>{ticket.finalprice.discount}</div>
                              <div>{ticket.finalprice.totalPrice}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='ml-96'>
                        <Button onClick={() => CancelNow(ticket._id)} style={{ className: 'button' }}>Cancel Ticket</Button>

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
                  ))}
                </div>

                <div className="receipt qr-code h-28 min-h-0 relative rounded-br-lg rounded-bl-lg rounded-tl-lg rounded-tr-lg flex items-center">
                  <div className='ml-10'>
                    <QRCode value={formattedData} />
                  </div>
                  <div className="description ml-10">
                    <p>Scan the QR code</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default CancelTicket;
