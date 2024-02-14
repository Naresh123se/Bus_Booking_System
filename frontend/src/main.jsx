import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
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
import Extra from './Pages/Extra.jsx';






import { Provider } from 'react-redux';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<IndexPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/Location' element={<Location />} />
      <Route path='/Booking' element={<Booking />} />
      <Route path='/Verify' element={<Verify />} />
      <Route path='/Profile' element={<Profile />} />
      <Route path='/Bus' element={<Bus />} />
      <Route path='/e' element={<Extra />} />



    </Route>
    
  )
);

const rootElement = document.getElementById('root');

// Use createRoot from 'react-dom/client'
const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
