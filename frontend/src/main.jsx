import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import store from './store';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './Pages/RegisterPage.jsx';
import IndexPage from './Pages/IndexPage.jsx';
import Booking from './Pages/Booking.jsx';
import Location from './Directions/DirectionMap.jsx';
import Verify from './Pages/Verify.jsx';
import Profile from './Pages/Profile.jsx';
import Bus from './Way/Bus.jsx';
import BusSeatSelection from './Pages/BusSeatSelection.jsx';
import LocationButton from './Pages/LocationButton.jsx';
import Seat from './Booking/Seat.jsx';
import Ticket from './Booking/Ticket.jsx';


import Extra from './Pages/Extra.jsx';
import PickDirection from './Directions/PickDirection.jsx';
import Payment from './Booking/Payment.jsx';
// import Int_Payment from './Booking/Int_Payment.jsx';
// *************

import Main from './Admin/Main.jsx';
import ALoginPage from './Admin/ALoginPage.jsx';
import ABooking from './Admin/ABooking.jsx';
import User from './Admin/User.jsx';
import ABus from './Admin/Bus.jsx';

// import BusSeatSelection from './Pages/BusSeatSelection.jsx'
import { Provider } from 'react-redux';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<IndexPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/Location' element={<Location />} />
      <Route path='/search' element={<Booking />} />
      <Route path='/Verify' element={<Verify />} />
      <Route path='/Profile' element={<Profile />} />
      <Route path='/Bus' element={<Bus/>} />
      <Route path='/e' element={<BusSeatSelection />} />
      <Route path='/love' element={<LocationButton />} />
      <Route path='/Seat' element={<Seat />} />
      <Route path='/Booking' element={<Booking />} />
      <Route path='/Extra' element={<Extra />} />
      <Route path='/PickD' element={<PickDirection />} />
      <Route path='/payment' element={<Payment />} />
      {/* <Route path='/Ipayment' element={<Int_Payment />} /> */}
      <Route path='/hlo' element={<BusSeatSelection />} />
      <Route path='/Ticket' element={<Ticket />} />


      {/* <Route path='/Extra' element={<Extra />} /> */}


     
    
       <Route path='/admin' element={<Main />} />
       <Route path='admin/Loginpage' element={<ALoginPage />} />
       <Route path='admin/Schedule' element={<ABooking />} />
       <Route path='admin/Passenger' element={<User />} />
       <Route path='admin/Bus' element={<ABus />} />

      </Route>  
      
   
  )
);

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
