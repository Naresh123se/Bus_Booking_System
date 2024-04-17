import React, { useEffect, useState, useRef } from 'react';
import WeekendIcon from '@mui/icons-material/Weekend';
import Button from '@mui/joy/Button';
import { toast } from 'react-toastify';
import { useSelseatMutation, useGetseatMutation } from '../slices/seat';
import { useGetbusMutation, useEditbusMutation, useDeletebusMutation } from '../slices/bus.js';
import CryptoJS from 'crypto-js';



import { loadStripe } from '@stripe/stripe-js';
import Loader from '../Directions/Loader';
import { Elements, useStripe, useElements, LinkAuthenticationElement, PaymentElement } from '@stripe/react-stripe-js';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import TimelineIcon from '@mui/icons-material/Timeline';
import Tooltip from '@mui/material/Tooltip';
import PayNow from '../Booking/PayNow.jsx';
import { useInitiatePaymentMutation } from '../slices/khalti.js';
import { useNavigate } from 'react-router-dom';

const Seat = ({ seatNumber, isBooked, selected, onSelect }) => (
    <button
        className={`p-2 m-1 relative ${selected ? 'text-[#009DF8]' : isBooked ? 'text-[#CC5500] cursor-not-allowed' : 'bg-gray-300 cursor-pointer'
            }`}

        onClick={() => onSelect(seatNumber)}
        disabled={isBooked}

    >

        {/* Icon */}

        <span className="">

            <Tooltip key={seatNumber} title={`${seatNumber}${seatNumber === 1 ? 'st' : seatNumber === 2 ? 'nd' : seatNumber === 3 ? 'rd' : 'th'} seat `} placement="top" arrow>
                <WeekendIcon sx={{ fontSize: '40px' }} />
                {seatNumber}
            </Tooltip>


        </span>


        {/* Selection Indicator */}
        {selected && (
            <span className="">
                {seatNumber}{ }</span>
        )}
    </button>
);

let totalPrice;
const BusSeatSelection = () => {
    const [seseats, setSeseats] = useState([]);
    const [getbus] = useGetbusMutation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [Selseat] = useSelseatMutation();
    const [Getseat] = useGetseatMutation();
    const [showSeat, setShowSeat] = useState(false);

    const [formData, setFormData] = useState([]);
    const [formError, setFormError] = useState(false);
    const [passengerNumber, setPassengerNumber] = useState(null);
    const [seats, setSeats] = useState([]);
    const [error1, setError1] = useState(null);
    const [price, setPrice] = useState(null);
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [tostartTime, setTostartTime] = useState('');
    const [toendTime, setToendTime] = useState('');
    const [final, setFinal] = useState('');
    const [seat, setSeat] = useState('');

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const Navigate = useNavigate(); // Initialize useHistory hook
    const [khalti, { isLoading, isError, error }] = useInitiatePaymentMutation();


    
    const handlePaymentMethodChange = (event) => {
      setSelectedPaymentMethod(event.target.value);
    };
    const [userdata1, setUserData1] = useState({
        email: '',
        phoneNumber: ''
    })
    const handleInputChange1 = (e) => {
        setFormData({
            ...userdata1,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        fetchSeats();
        fetchData();
        const passengerss = localStorage.getItem('search');
        const parsedData = JSON.parse(passengerss);
        const storedPassengerNumber = parsedData.count;
        const placefromLocation = parsedData.fromLocation;
        const placetoLocation = parsedData.toLocation;
        setFromLocation(placefromLocation);
        setToLocation(placetoLocation);
        const startTime = localStorage.getItem('startTime');
        const endTime = localStorage.getItem('endTime');
        setTostartTime(startTime);
        setToendTime(endTime);
        const capacity = localStorage.getItem('capacity');
        setSeat(capacity);
      
        const priceFromLocalStorage = localStorage.getItem('price');
        if (priceFromLocalStorage) {
            setPrice(parseFloat(priceFromLocalStorage)); // Assuming price is stored as a string and needs to be converted to a number
        }

        // console.log(storedPassengerNumber)
        if (storedPassengerNumber) {
            setPassengerNumber(storedPassengerNumber);
            console.log(passengerNumber);
        }

        // console.log(sceid);
    }, []);


    const [seseatsArray, setSeseatsArray] = useState([]);

    const fetchSeats = async () => {
        try {
            const response = await Getseat();
            const seatData = response.data.data; // Assuming this contains the array of seat objects
            console.log(seatData)
            // Extract seseats arrays from each seat object and concatenate them into a single array
            const seseats = seatData.reduce((accumulator, seat) => {
                return accumulator.concat(seat.seseats);
            }, []);

            const seatId = localStorage.getItem('scheduleId');
            const filteredSeats = seatData.filter(seat => seat.schedule === seatId);

            console.log(filteredSeats);

            // Extract selected seats from filteredSeats
            const selectedSeats = filteredSeats.reduce((accumulator, seat) => {
                return accumulator.concat(seat.seseats);
            }, []);

            // Update seseatsArray state with the selected seats
            setSeseatsArray(selectedSeats);

            console.log(selectedSeats); // Output: Selected seats
        } catch (error) {
            console.error('Error fetching seat data:', error);
            setError1(error.message);
        }
    };

    // Capacity

    const fetchData = async () => {
        try {
            const result = await getbus();
            const newData = result.data.data;


            console.log("Original data:", newData); // Log the original data

            // Create a copy of the newData array and then reverse it
            const reversedData = [...newData].reverse();
            console.log("Reversed data:", reversedData); // Log the reversed data

            // Set the reversed data in the state
            setData(reversedData);


        } catch (error) {
            console.error('Failed to fetch schedules:', error);
        }
    };


    const bookedSeats = seseatsArray;
    // 
    const handleSeatSelect = (seatNumber) => {
        // Check if the number of selected seats is less than or equal to the passenger number
        if (seseats.length < passengerNumber) {
            setSeseats((prevSeats) => {
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

// clear seat
    const handleClearSelection = () => {
        setSeseats([]);
        setFormData([]);
        localStorage.removeItem('seseats');
    };

    const userdata = async (event) => {
        event.preventDefault();
        try {
            localStorage.setItem('formData', JSON.stringify(formData));

            toast.success('Seats booked successfully!');
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    };


    const handleFormSubmit = async () => {
        try {
            if (formData.length !== seseats.length) {
                setFormError(true);
                return;
            }
            setIsSubmitting(true);
            const user = JSON.parse(localStorage.getItem('userInfo'));
            const ScId = localStorage.getItem('scheduleId');
            const userId = user?._id;
            console.log(userId)
            if (!userId) {
                throw new Error('User not authenticated or userId not found');
            }
            const response = await Selseat({ ScId, userId, seseats }).unwrap();


            console.log(response);
            // toast.success('Seats booked successfully!');
            fetchSeats();
            handleClearSelection();
        } catch (error) {
            console.error('Error occurred:', error);
            toast.error('An error occurred while booking seats. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    useEffect(() => {
        const storedSeats = JSON.parse(localStorage.getItem('seseats'));
        if (storedSeats) {
            setSeseats(storedSeats);
        }
    }, []);



    useEffect(() => {
        localStorage.setItem('seseats', JSON.stringify(seseats));
        setFormError(false);
        const newFormData = [];
        for (let i = 0; i < passengerNumber; i++) {
            newFormData.push({ firstName: '', lastName: '' });
        }
        setFormData(newFormData);
    }, [seseats, passengerNumber]);


    const [showForm, setShowForm] = useState(false);
    const [voucher, setVoucher] = useState('');

    const toggleForm = () => {
        setShowForm(prevState => !prevState);
    };

// payment

const redirectToKhalti = (response) => {
    if (response && response.payment_url) {
      window.location = response.payment_url;
    } else {
      console.error("Invalid response from Khalti:", response);
      // Handle invalid response
    }
  }

  const userInfoString = localStorage.getItem("userInfo");

  const userInfo = JSON.parse(userInfoString);
    const user = userInfo.name;
    const customerEmail = userInfo.email;

    const customerPhone = '982911';

    // TOTAL PRICE

    const encryptedPrice = CryptoJS.AES.encrypt(JSON.stringify(totalPrice), 'BUS2024').toString();
    localStorage.setItem('finalPrice', encryptedPrice);
   
  
//   const [decryptedBytes, setDecryptedBytes] = useState('');
//  // Retrieve the encryptedPrice from localStorage
// const encryptedPrice = localStorage.getItem('finalPrice');
// console.log('Encrypted Price:', encryptedPrice);

// // Decrypt the totalPrice when retrieving it
// const decrypted = CryptoJS.AES.decrypt(encryptedPrice, 'BUS2023');
// const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);




  const handleClick = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const response = await khalti({ amount: totalPrice ,customerName:user, customerEmail:customerEmail, customerPhone:customerPhone }).unwrap();
      redirectToKhalti(response);
    } catch (err) {
      console.error("Error occurred during payment initiation:", err);
      // Display error to the user
    }
  };



//   BOTH PAYMENT
  const handlePayment = (e) => {
    // Perform payment based on the selectedPaymentMethod
    if (selectedPaymentMethod === 'card') {
        console.log("first")
        Navigate('/Ipayment')
       // Pass the event parameter to handleClick
    } else if (selectedPaymentMethod === 'Khalti') {
      handleClick(e);
    } else {
      // No payment method selected
      toast.error('Please select a payment method'); // Display error toast
    }
  };
  // Check if a payment method is selected
  const isPaymentMethodSelected = selectedPaymentMethod !== '';



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




    const rows = Array.from({ length: (seat / 4) }, (_, i) => i + 1);

    const columns = Array.from({ length: 4 }, (_, i) => i + 1);

    const [isChecked, setIsChecked] = useState(false);

    // Function to handle checkbox change
    const handleCheckboxChange = () => {
        // Toggle the checkbox value
        setIsChecked(!isChecked);
    };



    // console.log(passengerNumber)
    const [discountAmount, setDiscountAmount] = useState(0);


    // console.log(totalPrice)
    const [discountedPrice, setDiscountedPrice] = useState();

    useEffect(() => {
        if (totalPrice !== undefined) {
            setDiscountedPrice(totalPrice);
        }
    }, []);


// price and passenger logic
    const priceFromStorage = localStorage.getItem('price');
    const userFromStorage = localStorage.getItem('search');

    let price11, count;

    // Check if priceFromStorage and userFromStorage are not null and not undefined
    if (priceFromStorage !== null && priceFromStorage !== undefined) {
        // Convert the price value to the appropriate data type if needed
        price11 = parseFloat(priceFromStorage);
        // console.log(price)
    } else {
        // Handle the case where price is not available in local storage
        console.error('Price not found in local storage');
    }

    // Check if userFromStorage is not null and not undefined
    if (userFromStorage !== null && userFromStorage !== undefined) {
        // Parse the user JSON string to extract the user data
        const user = JSON.parse(userFromStorage);

        // Extract the count from the user object
        if (user && typeof user === 'object' && user.hasOwnProperty('count')) {
            count = user.count;
        } else {
            // Handle the case where count is not available in user object
            console.error('Count not found in user object');
        }
    } else {
        // Handle the case where user is not available in local storage
        console.error('User not found in local storage');
    }

    console.log(price11, count)
    // Calculate the total price
    useEffect(() => {
        if (price11 !== undefined && count !== undefined) {
            totalPrice = price11 * count;
            console.log(totalPrice)
        }

    }, [price11, count]);

    // console.log(totalPrice)
    // Log the total price for testing purposes
    // console.log('Total Price:', totalPrice);
    // const encryptedPrice = CryptoJS.AES.encrypt(JSON.stringify(totalPrice), 'BUS2023').toString();
    // localStorage.setItem('finalPrice', encryptedPrice);

    //COUPON
    const submitVoucher = (event) => {
        setTotalVoucher(true);
        event.preventDefault();
        console.log(voucher)
        let discount = 0;
        if (voucher === 'COUPON123') {
            discount = 50;

        } else if (voucher === 'COUPON12') {
            discount = 40;

        }
        else if (voucher === 'COUPON1') {
            discount = 40;
        }

        else {
            toast.error('Invalid coupon code.');
        }
        const discountAmountValue = discount;
        setDiscountAmount(discountAmountValue);

        const discountedValue = (totalPrice - discount);
        setDiscountedPrice(discountedValue);
        console.log(discountedPrice)
    };


    const [totalVoucher, setTotalVoucher] = useState(false);

    return (
        <>
            <div className='flex'>
                <div className='  ml-20 w-6/12     mt-5 rounded-lg '>
                    <div className="border  border-[#c8c8c8] pl-5  rounded-lg pr-5 " >
                        <div className='flex  mt-5 mb-5'>
                            <h1 className=' font-semibold text-2xl size-8 flex  items-center justify-center  rounded-md    bg-[#009DF8]'>1</h1>
                            <h1 className=' ml-4 text-[23px] font-semibold'> Seat Reservation</h1>
                        </div>

                        <div className='mb-5 p-2 border-2 border-[#aed2e8] border- rounded-lg mr-2  bg'>

                            <div className="flex ">
                                <div className=" border-2 border-[#cbd5e3] drop-shadow-lg  bg-[#fafbfc] rounded-md w-[56%]   ">
                                    <div className="size-9 mt-5 mb-2 ml-72">
                                        <img src="steering.png" alt="steering" />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        {(rows).map((row) => (
                                            <div key={row} className=" flex  " style={{ margin: '2px' }}>
                                                {columns.map((column, index) => (
                                                    <React.Fragment key={column}>

                                                        <Seat
                                                            seatNumber={(row - 1) * columns.length + column}

                                                            isBooked={bookedSeats.includes((row - 1) * columns.length + column)}
                                                            selected={seseats.includes((row - 1) * columns.length + column)}
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

                                {/* seat clear &submit */}
                                <div className="  pl-7 w-auto">
                                    <div className='  pl-4 rounded-lg mt-1 border border-[#b8c4cb]'>


                                        <div className="mt-3   mr-[20px]">
                                            <div className=" border-2 border-[#b8c4cb]  w-[104%]  rounded-lg bg-[#faf6f6] ">


                                                <WeekendIcon sx={{ marginLeft: '10px', fontSize: '40px' }} />  <span className="text-[20px] "> = available</span><br />
                                                <WeekendIcon sx={{ marginLeft: '10px', color: '#009DF8', fontSize: '40px', }} /> <span className="text-[20px]  "> = selected</span> <br />
                                                <WeekendIcon sx={{ marginLeft: '10px', color: '#CC5500', fontSize: '40px' }} /> <span className="text-[20px] "> = unavailable</span> <br />
                                            </div>
                                            <div className='ml-1 mt-1 font-mono'>
                                                <p className=''> SELECTED SEATS : {seseats.length}</p>
                                                <p>SELECTED SEATS NUMBER : {seseats.length > 0 ? seseats.join(', ') : ''}</p>
                                            </div>

                                        </div>
                                        <div className='flex justify-center'>
                                            <Button sx={{ marginTop: '10px', marginBottom: '10px', bgcolor: '#3CC1FF', marginRight: '16px', width: '200px' }} onClick={handleClearSelection} >
                                                Clear
                                            </Button>
                                            {/* <Button sx={{ marginTop: '10px' }} onClick={handleFormSubmit} disabled={isSubmitting}>
                                                Submit
                                            </Button> */}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="border border-[#c8c8c8] pl-5 mt-5 rounded-lg w-full">
                        {passengerNumber > 0 && (
                            <div className="mt-5">
                                <form onSubmit={userdata}>
                                    <div className='flex'>
                                        <h1 className='font-semibold text-2xl size-8 flex items-center justify-center  rounded-md bg-[#009DF8]'>2</h1>
                                        <h1 className='ml-4 text-[23px] font-semibold'> Passenger Details</h1>
                                    </div>

                                    {formData.map((data, index) => (

                                        <div key={index} className="mb-5">
                                            <div className='flex mt-2'>

                                            </div>
                                            <div className="flex mt-3">
                                                <div className="mr-5">
                                                    <label htmlFor={`firstName${index}`} className="block text-[20px] mb-1">First Name:</label>
                                                    <input
                                                        id={`firstName${index}`}
                                                        className='border border-[#927f7f] rounded-md p-2'
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
                                                        className='border border-[#927f7f] rounded-md p-2'
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
                                    {/* <Button type="submit">Submit</Button> */}
                                </form>
                            </div>
                        )}
                    </div>



                    <div className="border border-[#C8C8C8] mb-10 pl-5 mt-5 rounded-lg w-full">
                        <form onSubmit={userdata}>
                            <div className='flex mt-5'>
                                <h1 className='font-semibold  text-2xl size-8 flex items-center justify-center  rounded-md bg-[#009DF8]'>3</h1>
                                <h1 className='ml-4 text-[23px] font-semibold'>Contact</h1>
                            </div>
                            <div className="flex mt-2 mb-5">
                                <div className="mr-4">
                                    <label htmlFor="email" className="block text-[20px]">Email</label>
                                    <input className='border border-[#927f7f] rounded-md  p-2'
                                        type="email"
                                        name="email"
                                        value={userdata1.email}
                                        onChange={handleInputChange1}
                                        placeholder="naresh@gmail.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-[20px]">Phone</label>
                                    <input className='border border-[#927f7f] rounded-md p-2'
                                        type="tel"
                                        name="phoneNumber"
                                        value={userdata1.phoneNumber}
                                        onChange={handleInputChange1}
                                        placeholder="9829111111"
                                        pattern="[0-9]{10}"  // Regular expression for a 10-digit phone number
                                        title="Please enter a valid 10-digit phone number"  // Error message to display if the pattern doesn't match
                                        required
                                    />
                                </div>
                            </div>
                            {formError && <div className="text-[red]">Please fill all the fields</div>}
                            {/* <Button type="submit">Submit</Button> */}
                        </form>
                    </div>




                </div>

                <div className='ml-20 mt-5 w-[26%]'>
                    <div className=' '>





                        <div className="border p-4 rounded-xl border-[#af9c9c] shadow-xl bg-[#ffffff]">
                            <h1 className='text-2xl font-semibold mb-4 bg text-[#5594be]'>Your Booking</h1>

                            <div className='border border-[#b0bec5] shadow-sm rounded-md bg-[#F1F1F1] p-2 mb-2'>
                                <div className='flex items-center'>
                                    <TimelineIcon className='mr-4 text-[gray-600]' sx={{ transform: 'rotate(135deg)', fontSize: '36px' }} />
                                    <div>
                                        <p className='text-lg'>{fromLocation}</p>
                                        <p className='text-lg'>{toLocation}</p>
                                    </div>
                                    <div className='ml-auto'>
                                        <p className='text-lg'>{tostartTime}</p>
                                        <p className='text-lg'>{toendTime}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-between mb-2'>
                                <p className='text-lg'>{passengerNumber === 1 ? '1 adult' : `${passengerNumber} adults`}</p>
                                <p className='text-lg font-semibold'>Rs. {(price * passengerNumber) - 1.00}</p>
                            </div>

                            <hr className='border-[#afa2a2]' />

                            <div className='flex justify-between mb-2'>
                                <p className='text-lg'>Service Fee</p>
                                <p className='text-lg font-semibold'>Rs. 1.00</p>
                            </div>

                            <hr className='border-[#afa2a2]' />



                            {totalVoucher && voucher.trim() !== '' && voucher.trim() !== '0' && (
                                <div className='flex'>
                                    <div className='flex w-full'>
                                        <p>Discount Amount: </p>
                                    </div>
                                    <div className='flex justify-end w-full font-medium text-lg'>
                                        Rs. -{discountAmount}
                                    </div>
                                </div>
                            )}


                            <div className='flex justify-between '>
                                <div className='flex items-center'>
                                    <h1 className='text-lg font-bold'>Total</h1>
                                    <p className='text-lg ml-1'>(incl. VAT)</p>
                                </div>
                                <h1 className='text-lg font-bold'>Rs. {discountedPrice}</h1>
                            </div>
                            {/* voucher */}
                            <div className=" mt-2">
                                <div className={`bg-[#f4f5f5] border border-[#B8C4CB] rounded-md py-1.5 px-1.5 cursor-pointer flex items-center justify-between ${showForm ? 'w-[130px]' : 'w-[130px]'}`} onClick={toggleForm}>
                                    <span><ConfirmationNumberIcon sx={{ color: '#2b75ad' }} className="mr-1" />Voucher</span>
                                    {showForm ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </div>
                                {showForm && (
                                    <div className="mt-1">
                                        <form onSubmit={submitVoucher}>
                                            <input
                                                type="text"
                                                value={voucher}
                                                onChange={(e) => setVoucher(e.target.value)}
                                                placeholder="Enter voucher"
                                                className="border border-[#9aa3a9] rounded-md py-2 px-3 mr-2 focus:outline-none focus:ring focus:border-blue-300"
                                                required
                                            />
                                            <Button type="submit" className="bg-btn text-white   rounded-md cursor-pointer ">
                                                Redeem
                                            </Button>
                                        </form>

                                    </div>
                                )}
                                {/* DISCOUNT LOGIC */}

                                <div>

                                </div>
                                <div className='flex mt-2 gap-1  '>
                                    <label>
                                        {/* Checkbox input */}
                                        <input
                                            type="checkbox"
                                            required
                                            checked={isChecked} // Controlled by the state
                                            onChange={handleCheckboxChange}
                                            className='size-6 mt-2 mr-2' // Handle checkbox change
                                        />
                                    </label>
                                    <p className=''>I declare to have read the Privacy Policy and I agree to the T&C of Booking </p>

                                </div>


                            </div>
                            <div className='mt-2 '>

                            <div>
        {/* Payment method selection */}
        <div className='flex'>
          <div className=' ml-10 flex border rounded-xl p-1.5 border-[#a8c0d7] shadow-lg bg-[#FAFBFC]'>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={selectedPaymentMethod === 'card'}
                onChange={handlePaymentMethodChange}
                className='size-5 mr-2 mt-1'
              />
            </label>
            <img src="/Card/Card.svg" alt="Card"  className='mr-10'/>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Khalti"
                checked={selectedPaymentMethod === 'Khalti'}
                onChange={handlePaymentMethodChange}
                className='size-5 mr-2 mt-1'
              />
            </label>
            <img src="/Card/Khalti.svg" style={{ width: '80px' }} alt="Card" />
          </div>
        </div>
  
        {/* Pay button */}
        {isPaymentMethodSelected && (
          <div className='mt-5  flex justify-center '>
            <Button className=''
  onClick={handlePayment}
  sx={{
    width: '300px',
    bgcolor: selectedPaymentMethod === 'card' ? '#009DF8' : '#3D1060', // Change color based on the selected payment method
    '&:hover': {
      bgcolor: selectedPaymentMethod === 'card' ? '#0077C9' : '#472e82', // Change color on hover based on the selected payment method
    },
  }}
>
  {selectedPaymentMethod === 'card' ? 'Pay with Card' : 'Pay with Khalti'}
</Button>

          </div>
        )}
      </div>


                            </div>





                        </div>








                    </div>


                </div>

                {/*  */}
            </div>

        </>
    );
};

export default BusSeatSelection;

