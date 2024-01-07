
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Pages/Header';
import IndexPage from './Pages/IndexPage';


const App = () => {
  return (
<>
         <Header/>
         <IndexPage/>
      <ToastContainer />

        <Outlet />
     
    </>
  );
};

export default App;