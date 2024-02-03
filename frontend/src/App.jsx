
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Pages/Header';

import Randers from './Pages/Randers'


const App = () => {
  return (
<>
    
<Randers/>
         <Header/>
      
      <ToastContainer />
        <Outlet />
       
    </>
  );
};

export default App;