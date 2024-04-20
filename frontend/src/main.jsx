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
import Blog from './Pages/Blog.jsx';

import Bus from './Way/Bus.jsx';
import BusSeat from './Pages/BusSeat.jsx';
import Seat from './Booking/Seat.jsx';
import Ticket from './Booking/Ticket.jsx';
import Des from './Booking/Destinations.jsx';


import PickDirection from './Directions/PickDirection.jsx';

import Mobile from './Directions/Mobile.jsx';


import Payment from './Booking/Payment.jsx';
import Confirmation from './Booking/PaymentCon.jsx';
import Not from './Pages/Notification.jsx';
import Int_Payment from './Booking/Stripe.jsx';
import Completion from './Booking/Completion.jsx';
import EXT from './Booking/Extra.jsx'
// *************

import Main from './Admin/Main.jsx';
import ALoginPage from './Admin/ALoginPage.jsx';
import ABooking from './Admin/ABooking.jsx';
import User from './Admin/User.jsx';
import ABus from './Admin/Bus.jsx';
import ADes from './Admin/Destinations.jsx';



import { Provider } from 'react-redux';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<IndexPage />} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/Location' element={<Location/>} />
      <Route path='/search' element={<Booking/>} />
      <Route path='/Verify' element={<Verify/>} />
      <Route path='/Profile' element={<Profile/>} />
      <Route path='/Bus' element={<Bus/>}/>
      <Route path='/seat' element={<BusSeat/>} />
      
      <Route path='/Extra' element={<EXT/>} />

      <Route path='/Seat1' element={<Seat/>} />
      <Route path='/Booking' element={<Booking/>} />
      <Route path='/blog' element={<Blog/>} />
   
      <Route path='/PickD' element={<PickDirection/>} />
      <Route path='/payment' element={<Payment/>} />
      <Route path='/confirmation' element={<Confirmation/>} />
      <Route path='/Ipayment' element={<Int_Payment />} />

      <Route path='/Ticket' element={<Ticket/>} />
      <Route path='/Des' element={<Des/>} />
      <Route path='/Not' element={<Not/>} />
      <Route path='/completion' element={<Completion/>} />



    
      <Route path='/M' element={<Mobile/>} />





     
    
       <Route path='/admin' element={<Main />} />
       <Route path='admin/Loginpage' element={<ALoginPage />} />
       <Route path='admin/Schedule' element={<ABooking />} />
       <Route path='admin/Passenger' element={<User />} />
       <Route path='admin/Bus' element={<ABus />} />
       <Route path='admin/Des' element={<ADes />} />

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
