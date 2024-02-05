
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Pages/Header';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './slices/authSlice';



const App = () => {
  const dispatch = useDispatch();
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
          dispatch(setCredentials({ data:{...resObject.user} }));
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
<>
    

         <Header/>
      
      <ToastContainer />
        <Outlet />
       
    </>
  );
};

export default App;