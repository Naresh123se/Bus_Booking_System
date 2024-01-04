
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Pages/Header';


const App = () => {
  return (
<>
         <Header/>
      <ToastContainer />

        <Outlet />
     
    </>
  );
};

export default App;