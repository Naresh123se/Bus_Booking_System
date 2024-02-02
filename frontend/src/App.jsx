
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Pages/Header';
import "./google"


const App = () => {
  return (
<>
         <Header/>
    
          <google/>
      <ToastContainer />

    
        <Outlet />
       
    </>
  );
};

export default App;