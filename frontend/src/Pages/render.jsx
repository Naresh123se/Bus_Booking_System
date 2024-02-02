import React from 'react'

useEffect(() => {
    console.log('useEffect is running...');
  
    const getUser = () => {
      console.log('getUser is called...');
      fetch("http://localhost:5000/auth/login/success", {
        
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("Authentication has failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
  
          // Store user information in local storage
          localStorage.setItem("user", JSON.stringify(resObject.user));
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    getUser();
  }, []);
  
const render = () => {
  return (
    <div> </div>
  )
}

export default render