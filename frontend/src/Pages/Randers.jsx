import React from 'react'
import { useEffect, useState } from 'react';


const Randers = () => {

    
const [user, setUser] = useState(null);

useEffect(() => {
  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });

      if (response.status === 200) {
        const resObject = await response.json();
        setUser(resObject.user);
        localStorage.setItem("user", JSON.stringify(resObject.user));
      } else {
        throw new Error("Authentication has failed!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  getUser();
}, []);

  return (
    <div> </div>
  )
}

export default Randers