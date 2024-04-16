import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';


const Ticket = () => {
  // Sample data for demonstration

  const storedValue = localStorage.getItem('user') || localStorage.getItem('userInfo');
  const userData = JSON.parse(storedValue);
  const userName = userData.displayName || userData.name;
  const email = userData.email || userData.email;
  console.log(email)
  console.log(userName);
  

 

  console.log('User name:', userName);
  // Check if the value exists
  if (storedValue !== null) {
    // Value exists, use it
    console.log('Value from local storage:', storedValue);
  } else {
    // Value does not exist in local storage
    console.log('Value does not exist in local storage');
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


  const [printingCompleted, setPrintingCompleted] = useState(false);

  // Simulate ticket printing completion after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setPrintingCompleted(true);
    }, 3000); // Change the delay time as needed

    return () => clearTimeout(timer);
  }, []);



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
              <h1 className="text-[#307094]  font-medium">{passengerData.name} Ticket here..</h1>
              <div className="w-[90%] h-3 border-2 border-[#cfc6c6] rounded-lg shadow-md bg-[#009DF8]"></div>
            </>
          )}
        </div>
        <div className="overflow-hidden mt-[-55px] pb-10 ml-4">
          <div className="receipts">
            <div className="receipt ">
             
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
                <p className='text-[#009DF8]'> ee</p>
            </div>
        </div>

        <p>Bus No :</p>

    </div>
    <div className='grid justify-items-end w-full'>
        <img src="3n.svg" alt="" className='size-16' />
        <a href="mailto:merobus3@gmail.com" className='text-[#009DF8]  underline'>merobus3@gmail.com</a>

        <p>Journey Date:</p>
        <p>Departure Time:</p>
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
    Phone No: <span className="ml-[50px]">{passengerData.name}</span>
</p>
    <p className=''>
    Seat No: <span className="ml-16">{passengerData.name}</span>
</p>

    </div>
    <hr className="w-72  text-[#cbcbcb] transform rotate-90  mt-12 ml-96 " />
    <div className='grid justify-items-end w-full'>
        <p>No of Passenger:</p>
        <p>Price:</p>
        <p>Discount:</p>
        <p>Total Price:</p>
    </div>
    <hr />
</div>

</div>

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
