import React, { useState, useEffect } from 'react';
import { useGetTicketMutation } from '../slices/ticket';
import AIndex from './AIndex';
import Button from '@mui/joy/Button';

const UserTicket = () => {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [getTicket] = useGetTicketMutation();
    const [searchQuery, setSearchQuery] = useState('');
    const [noRecord, setNoRecord] = useState(false);

    useEffect(() => {
        const fetchAndFilterTickets = async () => {
            try {
                const response = await getTicket();
                console.log(response);
                const tickets = response.data.tickets;
                setTickets(tickets);

                if (tickets.length > 0) {
                    setFilteredTickets(tickets);
                    setNoRecord(false);
                } else {
                    setNoRecord(true);
                }
            } catch (error) {
                console.error('Error fetching or filtering tickets:', error);
            }
        };

        fetchAndFilterTickets();
    }, [getTicket]);

    useEffect(() => {
        console.log("Filtering tickets with query:", searchQuery);
        const results = tickets.filter(ticket =>
            (ticket.userId.name && ticket.userId.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (ticket.ticketNum && ticket.ticketNum.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (ticket.SchId.calender && ticket.SchId.calender.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (ticket.BusNumber && ticket.BusNumber.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
            (ticket.seat && ticket.seat.toString().toLowerCase().includes(searchQuery.toLowerCase()))
        );
        console.log("Filtered results:", results);
        setFilteredTickets(results);
    }, [searchQuery, tickets]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <div className='flex overflow-hidden w-full bg'>
                <div>
                    <AIndex />
                </div>

                <div className='w-full'>
                    <div className='text-lg font-semibold text-[#fff] bg-[#3583b1] pl-10 pt-2 pb-2 flex'>
                        Users Tickets
                        <div className='flex'>
                            <div className='ml-40'>
                                <input
                                    type="text"
                                    className="border border-[#c2ced5] rounded-xl h-10 w-96 text-[black]"
                                    placeholder="Search by Name, Ticket No, Date, Bus Number, or Seat Number"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button onClick={handlePrint} className="" sx={{ marginLeft: '60%' }}>Print</Button>
                        </div>
                    </div>
                    <style>
                        {`
                            @media print {
                                body * {
                                    visibility: hidden;
                                }
                                #printableArea, #printableArea * {
                                    visibility: visible;
                                }
                                #printableArea {
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                }
                            }
                        `}
                    </style>
                    <div id="printableArea">
                        <table className='w-full border-collapse'>
                            <thead>
                                <tr>
                                    <th className="p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">SN</th>
                                    <th className="p-2  border border-[#c2ced5] text-center bg-[#009DF8] text-white">Name</th>
                                    <th className="p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Ticket No</th>
                                    <th className="p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Date</th>
                                    <th className="p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Total Price</th>
                                    <th className="p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Bus Number</th>
                                    <th className="p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Seat Number</th>
                                </tr>
                            </thead>
                            <tbody className='flex-col '>
                                {filteredTickets.map((ticket, index) => (
                                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} className=''>
                                        <td className="pl- p-2 text-center">{index + 1}</td>
                                        <td className="text-center ">{ticket.userId.name}</td>
                                        <td className="pl-2 text-center ">{ticket.ticketNum}</td>
                                        <td className="pl-2 text-center">{ticket.SchId.calender}</td>
                                        <td className="pl-2 text-center">Rs.{ticket.finalprice.totalPrice}</td>
                                        <td className="pl-2 text-center">{ticket.BusNumber}</td>
                                        <td className="pl-2 text-center">{ticket.seat}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {noRecord && (
                        <div className="mt-4 text-red-500 text-center">
                            No records found for the provided search query.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserTicket;
