import React from 'react';
import { useState, useEffect } from 'react';
import { useGetTicketMutation } from '../slices/ticket';

const UserTicket = () => {
    const [tickets, setTickets] = useState([]);
    const [final, setFinal] = useState([]);
    const [getTicket] = useGetTicketMutation();

    const [isOpen, setIsOpen] = useState(false);
    const [noRecord, setNoRecord] = useState(false);

    const storedValue = localStorage.getItem('user') || localStorage.getItem('userInfo');
    const userData = JSON.parse(storedValue);
    // const userName = userData.displayName || userData.name;
    // const email = userData.email || userData.email;
    const id = userData._id || userData._id;

    useEffect(() => {
        const fetchAndFilterTickets = async () => {
            try {
                const response = await getTicket();
                console.log(response);
                const tickets = response.data.tickets;
                setTickets(tickets);
                const filteredTickets = tickets.filter(ticket => ticket.userId._id === id);

                if (filteredTickets.length > 0) {
                    setFinal(filteredTickets);
                    setIsOpen(true);
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

    return (
        <div className='mt-5 ml-20 pb-40 mr-20'>
            <h1 className='mb-5 font-semibold text-xl'>Ticket</h1>
            <table className='w-full border-collapse'>
                <thead>
                    <tr>
                        <th className="p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">SN</th>
                        <th className="p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Name</th>
                        <th className="p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Ticket No</th>
                        <th className="p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Date</th>
                        <th className="p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Total Price</th>
                        <th className="p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Bus Number</th>
                        <th className="p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Seat Number</th>
                    </tr>
                </thead>
                <tbody>
                    {final.map((ticket, index) => (
                        <tr key={index}>
                            <td className="p-2 border text-center border-[#c2ced5]">{index + 1}</td>
                            <td className="p-2 border text-center border-[#c2ced5]">{ticket.userId.name}</td>
                            <td className="p-2 border text-center border-[#c2ced5]">{ticket.ticketNum}</td>
                            <td className="p-2 border text-center border-[#c2ced5]">{ticket.SchId.calender}</td>
                            <td className="p-2 border text-center border-[#c2ced5]">Rs.{ticket.finalprice.totalPrice}</td>
                            <td className="p-2 border text-center border-[#c2ced5]">{ticket.BusNumber}</td>
                            <td className="p-2 border text-center border-[#c2ced5]">{ticket.seat}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {noRecord && (
                <div className="mt-4 text-red-500 text-center">
                    No records found for the provided mobile number.
                </div>
            )}
        </div>
    );
}

export default UserTicket;
