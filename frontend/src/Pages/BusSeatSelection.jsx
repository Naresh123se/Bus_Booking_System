import React, { useEffect, useState } from 'react';
import WeekendIcon from '@mui/icons-material/Weekend';
import Button from '@mui/joy/Button';
import { ToastContainer, toast } from 'react-toastify';
import { useSelseatMutation } from '../slices/seat';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const Seat = ({ seatNumber, isBooked, selected, onSelect }) => (
  <button
    className={`p-2 m-1 relative ${selected ? 'text-[#009DF8]' : isBooked ? 'text-[#CC5500] cursor-not-allowed' : 'bg-gray-300 cursor-pointer'
      }`}
    onClick={() => onSelect(seatNumber)}
    disabled={isBooked}
  >
    {/* Icon */}
    <span className="">
      <WeekendIcon />
    </span>
    {/* Selection Indicator */}
    {selected && (
      <span className="">{/* ... */}</span>
    )}
  </button>
);

const BusSeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const bookedSeats = [3, 4, 10, 15]; // Update this array based on the seats that are already booked
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Selseat] = useSelseatMutation();
  const [showSeat, setShowSeat] = useState(false);

  const [formData, setFormData] = useState([]);
  const [formError, setFormError] = useState(false);
  const [passengerNumber, setPassengerNumber] = useState(0);

  useEffect(() => {
    const passengerss = localStorage.getItem('search');

    const parsedData = JSON.parse(passengerss);
    const storedPassengerNumber = parsedData.count;
    // console.log(storedPassengerNumber)
    if (storedPassengerNumber) {
      setPassengerNumber(storedPassengerNumber);
    }
  }, []);



  useEffect(() => {
    const scheduleId = localStorage.getItem('scheduleId');
    console.log(scheduleId);
  }, []);



  const handleSeatSelect = (seatNumber) => {
    // Check if the number of selected seats is less than or equal to the passenger number
    if (selectedSeats.length < passengerNumber) {
      setSelectedSeats((prevSeats) => {
        if (prevSeats.includes(seatNumber)) {
          return prevSeats.filter((seat) => seat !== seatNumber);
        } else {
          let newSeats = [...prevSeats, seatNumber];
          newSeats.sort((a, b) => a - b);
          return newSeats;
        }
      });
    } else {
      // Notify the user if they try to select more seats than allowed
      toast.error(`You can only select ${passengerNumber} seats.`);
    }
  };


  const handleClearSelection = () => {
    setSelectedSeats([]);
    setFormData([]);
    localStorage.removeItem('selectedSeats');
  };

  const userdata = async (event) => {
    event.preventDefault();
    try {
      localStorage.setItem('formData', JSON.stringify(formData));
      console.log(formData);
      toast.success('Seats booked successfully!');
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };




  const handleFormSubmit = async () => {
    try {
      if (formData.length !== selectedSeats.length) {
        setFormError(true);
        return;
      }
      setIsSubmitting(true);
      const user = JSON.parse(localStorage.getItem('userInfo'));
      const userId = user?.name;
      if (!userId) {
        throw new Error('User not authenticated or userId not found');
      }
      const response = await Selseat({ userId, selectedSeats, formData }).unwrap();
      console.log(response);
      toast.success('Seats booked successfully!');
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('An error occurred while booking seats. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const storedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (storedSeats) {
      setSelectedSeats(storedSeats);
    }
  }, []);



  useEffect(() => {
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    setFormError(false);
    const newFormData = [];
    for (let i = 0; i < passengerNumber; i++) {
      newFormData.push({ firstName: '', lastName: '' });
    }
    setFormData(newFormData);
  }, [selectedSeats, passengerNumber]);


  const [showForm, setShowForm] = useState(false);
  const [voucher, setVoucher] = useState('');

  const toggleForm = () => {
    setShowForm(prevState => !prevState);
  };

  const submitVoucher = (event) => {
    event.preventDefault();
    console.log('Voucher submitted:', voucher);
    // Further logic, such as submitting the voucher to the backend, can be added here
    // Clear the voucher input field
    setVoucher('');
  };


  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newData = [...formData];
    newData[index][name] = value;
    if (name === 'firstName' || name === 'lastName') {
      const firstName = newData[index]['firstName'];
      const lastName = newData[index]['lastName'];
      newData[index]['fullName'] = `${firstName} ${lastName}`.trim();
    }
    setFormData(newData);
  };

  const rows = Array.from({ length: 6 }, (_, i) => i + 1);
  const columns = Array.from({ length: 4 }, (_, i) => i + 1);

  return (
    <>
    <div className='flex  '> 
    <div className='  ml-20 w-6/12    mt-5 rounded-lg '> 
    <div className="border  pl-5  rounded-lg pr-5 " >
    <div className='flex  mt-5 mb-5'>
      <h1 className=' font-semibold text-2xl     size-8 flex  items-center justify-center border rounded-md    bg-[#009DF8]'>1</h1>
     <h1 className=' ml-4 text-[23px] font-semibold'> Seat Reservation</h1>
    </div>
  
      <div  className='mb-5 border rounded-lg mr-2'>
        <ToastContainer />
        <div className="flex">
          <div className="border ">
            <div className="size-6 mt-2 ml-44">
              <img src="steering.png" alt="steering" />
            </div>
            <div className="flex flex-col items-center">
              {rows.map((row) => (
                <div key={row} className=" flex  " style={{ margin: '2px' }}>
                  {columns.map((column, index) => (
                    <React.Fragment key={column}>
                      <Seat
                        seatNumber={(row - 1) * columns.length + column}
                        isBooked={bookedSeats.includes((row - 1) * columns.length + column)}
                        selected={selectedSeats.includes((row - 1) * columns.length + column)}
                        onSelect={handleSeatSelect}
                      />
                      {index === columns.length / 2 - 1 && <div style={{ width: '30px' }} />}
                    </React.Fragment>
                  ))}
                  {row === 1 && <div className=" "></div>}
                </div>
              ))}
            </div>
          </div>
          <div className="border  pl-4   w-auto">
            <div className="mt-3   l-20 mr-[20px]">
              <WeekendIcon sx={{ marginLeft: '5px' }} /> = available <br />
              <WeekendIcon sx={{ marginLeft: '5px', color: '#009DF8' }} /> = selected <br />
              <WeekendIcon sx={{ marginLeft: '5px', color: '#CC5500' }} /> = unavailable <br />
              Selected Seats: {selectedSeats.length} <br />
              Selected Seats number: {selectedSeats.length > 0 ? selectedSeats.join(', ') : ''}
            </div>
            <Button sx={{ marginTop: '10px', bgcolor: '#422bd6' }} onClick={handleClearSelection}>
              Clear
            </Button>
            <br />
            <Button sx={{ marginTop: '10px' }} onClick={handleFormSubmit} disabled={isSubmitting}>
              Submit
            </Button>
          </div>
        </div>
      </div>
      </div>



      <div className="border pl-5 mt-5 rounded-lg w-full">
  {passengerNumber > 0 && (
    <div className="">
      <form onSubmit={userdata}>
        {formData.map((data, index) => (
          <div key={index} className="mb-5">
            <div className='flex mt-5'>
              <h1 className='font-semibold text-2xl size-8 flex items-center justify-center border rounded-md bg-[#009DF8]'>2</h1>
              <h1 className='ml-4 text-[23px] font-semibold'> Passenger Details</h1>
            </div>
            <div className="flex mt-3">
              <div className="mr-5">
                <label htmlFor={`firstName${index}`} className="block text-[20px] mb-1">First Name:</label>
                <input 
                  id={`firstName${index}`}
                  className='border rounded-md p-2'
                  type="text"
                  name="firstName"
                  value={data.firstName}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <label htmlFor={`lastName${index}`} className="block text-[20px] mb-1">Last Name:</label>
                <input 
                  id={`lastName${index}`}
                  className='border rounded-md p-2'
                  type="text"
                  name="lastName"
                  value={data.lastName}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
          </div>
        ))}
        {formError && <div className="text-[red]">Please fill all the fields</div>}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )}
</div>



<div className="border pl-5 mt-5 rounded-lg w-full">
  <form onSubmit={userdata}>
    <div className='flex mt-5'>
      <h1 className='font-semibold text-2xl size-8 flex items-center justify-center border rounded-md bg-[#009DF8]'>3</h1>
      <h1 className='ml-4 text-[23px] font-semibold'>Contact</h1>
    </div>
    <div className="flex mt-5">
      <div className="mr-4">
        <label htmlFor="email" className="block text-[20px]">Email:</label>
        <input className='border rounded-md  p-2'
          type="email"
          name="email"
          // value={data.firstName}
          onChange={(e) => handleInputChange(index, e)}
          placeholder="naresh@gmail.com"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-[20px]">Phone:</label>
        <input className='border rounded-md p-2'
          type="tel"
          name="phoneNumber"
          // value={data.lastName}
          onChange={(e) => handleInputChange(index, e)}
          placeholder="9829111111"
          pattern="[0-9]{10}"  // Regular expression for a 10-digit phone number
          title="Please enter a valid 10-digit phone number"  // Error message to display if the pattern doesn't match
          required
        />
      </div>
    </div>
    {formError && <div className="text-[red]">Please fill all the fields</div>}
    <Button type="submit">Submit</Button>
  </form>
</div>














 
</div>

      <div className='ml-20 mt-5 w-[26%]'>
        <div className='border p-3 rounded-sm bg-[#23adfd]'> 
        <div className="border  p-1  rounded-lg pr-5 bg-[white] ">
          <h1 className='text-[20px]'>Your Booking</h1>
          <div className='border rounded-md bg-[#F1F1F1] '>
            <p>booking name</p>
            
            <p>booking price</p>
            

          </div>
        
            <p>people </p>
            <hr/>
            <h1>Total </h1>
          <div>
{/*  */}
<div className="p-4">
  <div
    className={`bg-gray-200 border border-gray-300 rounded-md py-2 px-2 cursor-pointer flex items-center justify-between  ${showForm ? 'w-[130px]' : 'w-[130px]'}`}
    onClick={toggleForm}
  >
    <span> <ConfirmationNumberIcon/> Voucher</span>
    {showForm ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
  </div>
  {showForm && (
    <div className="mt-4" >
      <form onSubmit={submitVoucher}>
        <input
          type="text"
          value={voucher}
          onChange={(e) => setVoucher(e.target.value)}
          placeholder="Enter voucher"
          className="border border-gray-300 rounded-md py-2 px-4 mr-2 focus:outline-none focus:ring focus:border-blue-300"
          required
        />
        <Button
          type="submit"
          className="bg-btn text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600"
        >
          Submit
        </Button>
      </form>
    </div>
  )}
</div>



          </div>
          <p>booking desc</p>
        </div>

        </div>

        
      </div>

  {/*  */}
  
  
  







      </div>

    </>
  );
};

export default BusSeatSelection;

