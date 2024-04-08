// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io("http://localhost:5000");

// socket.on("connect", () => {
//     console.log("Connected to Socket.IO server");
// });

// socket.on("error", (error) => {
//     console.error("Socket.IO connection error:", error);
// });


// const AdminComponent = () => {
//   const [notificationText, setNotificationText] = useState('');

//   const handleSendNotification = () => {
//     socket.emit('sendNotification', notificationText);
//     setNotificationText( ); // Reset the input value after sending the notification
//   };

//   useEffect(() => {
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Admin Page</h2>
//       <div>
//         <input
//           type="text"
//           value={notificationText || ''} // Ensure the value is never undefined
//           onChange={(e) => setNotificationText(e.target.value)}
//           placeholder="Enter notification message"
//         />
//         <button onClick={handleSendNotification}>Send Notification</button>
//       </div>
//     </div>
//   );
// };

// export default AdminComponent;


import React from 'react'

const Notification = () => {
  return (
    <div>Notification</div>
  )
}

export default Notification