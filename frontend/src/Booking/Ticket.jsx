// import React from 'react'

// const Ticket = () => {
//   return (
//    <>
   
   

 

//   <main class="ticket-system">
//     <div class="top">
//       <h1 class="text-[red]">Wait a second, your ticket is being printed</h1>
//       <div className="printer w-5/6 border-2 border-white rounded-full shadow-md  mt-10"></div>
//         </div>
//     <div class="receipts-wrapper">
//       <div class="receipts">
//         <div class="receipt">
//           <svg class="airliner-logo" viewBox="0 0 403 94" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414">
//             <path d="M402.772 59.544c0-13.172-9.632-16.649-21.203-20.114-5.601-1.644-10.58-3.115-10.58-7.98 0-4.271 4.319-5.691 7.571-5.691 2.738 0 7.917.578 8.342 6.918h14.702c-.252-12.098-10.128-17.364-22.78-17.364-7.835 0-14.34 2.226-18.431 6.246-2.835 2.808-4.578 6.922-4.578 11.209 0 11.122 7.418 15.579 15.823 18.123 9.431 2.879 15.669 4.606 15.669 9.801 0 3.462-2.741 6.927-8.161 6.927-6.914 0-9.415-4.118-9.581-8.165h-14.843c0 13.757 11.587 18.803 24.424 18.803 16.37 0 23.626-9.321 23.626-18.713m-53.36 0c0-13.172-9.584-16.649-21.171-20.114-5.585-1.644-10.6-3.115-10.6-7.98 0-4.271 4.338-5.691 7.587-5.691 2.757 0 7.913.578 8.326 6.918h14.675c-.244-12.098-10.073-17.364-22.749-17.364-7.839 0-14.348 2.226-18.415 6.246-2.831 2.808-4.582 6.922-4.582 11.209 0 11.122 7.418 15.579 15.835 18.123 9.415 2.879 15.673 4.606 15.673 9.801 0 3.462-2.745 6.927-8.169 6.927-6.922 0-9.431-4.118-9.581-8.165h-14.835c0 13.757 11.586 18.803 24.416 18.803 16.326 0 23.59-9.321 23.59-18.713m-166.379 0c0-11.453-6.077-15.288-19.366-19.622-6.266-2.037-12.106-3.607-12.106-8.472 0-4.271 4.338-5.691 7.587-5.691 2.749 0 7.929.578 8.349 6.918h14.659c-.252-12.098-10.088-17.364-22.749-17.364-7.846 0-14.328 2.226-18.418 6.246-2.844 2.808-4.578 6.922-4.578 11.209 0 11.122 7.425 15.579 15.814 18.123 9.44 2.879 15.678 4.606 15.678 9.801 0 3.462-2.75 6.927-8.181 6.927-6.891 0-9.404-4.118-9.561-8.165h-14.844c0 13.757 11.603 18.803 24.405 18.803 16.349 0 23.311-9.321 23.311-18.713m74.787-42.843l-9.978 40.035-11.689-40.035h-14.981l-11.681 40.035-10.006-40.035h-15.162l16.491 59.739h16.02l11.822-40.966 11.827 40.966h16l16.542-59.739H257.82zm36.723 59.739h-15.516V16.701h15.516V76.44zM102.141 93.347H0L74.861 0h50.276l-22.996 93.347z" fill="#dc2f34"/>
//             <path d="M86.514 38.058V17.96H69.291v20.098H49.193v17.223h20.079v20.106h17.23V55.281h20.11V38.058H86.514z" fill="#fff"/>
//           </svg>
//           <div class="route">
//             <h2>NYC</h2>
//             <svg class="plane-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 510">
//               <path fill="#3f32e5" d="M497.25 357v-51l-204-127.5V38.25C293.25 17.85 275.4 0 255 0s-38.25 17.85-38.25 38.25V178.5L12.75 306v51l204-63.75V433.5l-51 38.25V510L255 484.5l89.25 25.5v-38.25l-51-38.25V293.25l204 63.75z"/>
//             </svg>
//             <h2>ATL</h2>
//           </div>
//           <div class="details">
//             <div class="item">
//               <span>Passanger</span>
//               <h3>69Pixels</h3>
//             </div>
//             <div class="item">
//               <span>Flight No.</span>
//               <h3>US6969</h3>
//             </div>
//             <div class="item">
//               <span>Departure</span>
//               <h3>08/26/2018 15:33</h3>
//             </div>
//             <div class="item">
//               <span>Gate Closes</span>
//               <h3>15:03</h3>
//             </div>
//             <div class="item">
//               <span>Luggage</span>
//               <h3>Hand Luggage</h3>
//             </div>
//             <div class="item">
//               <span>Seat</span>
//               <h3>69P</h3>
//             </div>
//           </div>
//         </div>
//         <div class="receipt qr-code">
//           <svg class="qr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.938 29.938">
//             <path d="M7.129 15.683h1.427v1.427h1.426v1.426H2.853V17.11h1.426v-2.853h2.853v1.426h-.003zm18.535 12.83h1.424v-1.426h-1.424v-1.427h-1.427v1.427h-1.426v1.426h3.853zm-3.547-20.115h1.426v-1.426h-1.426v-1.427h-1.427v1.427h-1.426v1.426h1.426zM0 0h5.365v5.365H0V0zm24.571 0h5.366v5.365h-5.366V0zm0 24.571h5.366v5.366h-5.366v-5.366zm-24.571 0h5.365v5.366H0v-5.366zm2.852 2.853h1.426v-1.426h1.426v-1.427h1.427v1.427h1.426v1.426h-3.853zm14.281-14.281h1.426V7.112h1.426V5.685h1.427v1.427h1.426v1.426h-3.853zm3.547 20.115h1.426v-1.426h-1.426v-1.427h-1.427v1.427h-1.426v1.426h3.853zM7.129 0h1.427v1.426h1.426v1.427H5.702V1.426H7.129v-1.426h.003zm18.535 12.83h1.424v-1.426h-1.424v-1.427h-1.427v1.427h-1.426v1.426h3.853zM2.853 26.267h1.426v-1.426h1.426v-1.427h1.427v1.427h1.426v1.426h-3.853zM10.984 6.257h2.853v2.853h-2.853V6.257zm11.152 11.153h2.853v2.853h-2.853v-2.853zm0-5.708h2.853v2.853h-2.853v-2.853zm0 11.161h2.853v2.852h-2.853v-2.852zm-5.708-5.708h2.853v2.853h-2.853v-2.853zm0 5.708h2.853v2.852h-2.853v-2.852zm-5.707-5.708h2.852v2.853h-2.852v-2.853zm0 5.708h2.852v2.852h-2.852v-2.852zm-5.709-5.708h2.853v2.853h-2.853v-2.853zm0 5.708h2.853v2.852h-2.853v-2.852z" fill="#3f32e5"/>
//           </svg>
//           <div class="description">
//             <h2>Boarding Pass</h2>
//             <p>Scan the QR code to board</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </main>


//    </>
//   )
// }

// export default Ticket


import React from 'react';
import QRCode from 'qrcode.react';

const Ticket = () => {
  return (
    <>
      <main className="ticket-system">
        <div className="top">
          <h1 className="text-[red]">Wait a second, your ticket is being printed</h1>
          <div className="printer w-5/6 border-2 border-white rounded-full shadow-md mt-10"></div>
        </div>
        <div className="receipts-wrapper">
          <div className="receipts">
            <div className="receipt">
              {/* Your existing JSX */}
            </div>
            <div className="receipt qr-code">
              <QRCode value="Your boarding pass data here" /> {/* Provide the data you want to encode */}
              <div className="description">
                <h2>Boarding Pass</h2>
                <p>Scan the QR code to board</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Ticket;
