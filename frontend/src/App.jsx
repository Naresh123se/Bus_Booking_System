
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './slices/authSlice';
import Header1 from './Admin/Header1';
import Footer1 from './Admin/AFooter';

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
          dispatch(setCredentials({ data: { ...resObject.user } }));
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

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAdmin(isLoggedIn);
  }, []);

  return (
    <>
      {isAdmin ? <Header1 /> : <Header />}
      
      <ToastContainer />
      <Outlet />
      {isAdmin ? <Footer1 /> : <Footer />}
  
  
    </>
  );
};

export default App;