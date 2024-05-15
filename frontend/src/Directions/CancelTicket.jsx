import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/joy/Button';
const CancelTicket = () => {
    const [ticket, setTicket] = useState()
    const [cancel, setCancel] = useState()
    const [trip, setTrip] = useState()

useEffect(() => {
    const fetchLocalData = () => {
        // Assuming 'localData' is the data you want to fetch
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const localData = today.toISOString().split('T')[0];

        setTrip(localData)};
        fetchLocalData()
},[]);
   

    return (
        <>
            <div className='ml-60 mt-3 '>
                <div className=''>
                    <h1 className='font-semibold text-[20px]'>Search Ticket</h1>
                </div>
<h3 className='text-[#9e7171] w-96'>Note: Please be advised that tickets for today's trip date cannot be canceled</h3>
                <div className='grid w-60 gap-2 mt-1 '>
                    <h2>Ticket Number</h2>
                    <TextField
                        label="Ticket Number..."
                        name="textInput"
                        type='text'
                        placeholder='Your ticket number'
                        size='small'
                        required={true}
                        value={ticket}
                        onChange={(e) => setTicket(e.target.value)}
                       

                    />
                    <h2>Mobile Number</h2>
                    <TextField
                        label="Mobile Number..."
                        name="textInput"
                        type='number'
                        placeholder='Your mobile number'
                        size='small'
                        required={true}
                        value={cancel}
                        onChange={(e) => setCancel(e.target.value)}

                    />
                   <h2>Trip Date</h2>
                   
                   <TextField type="date"
                     size='small'
                    required={true}
                    value={trip}
                    onChange={(e) => setTrip(e.target.value)}
                    inputProps={{ min: trip }}
                    />
                    

                </div>
                <div className='mt-5 '>
                    <Button>Search</Button>
                </div>

            </div>
        </>
    )
}

export default CancelTicket