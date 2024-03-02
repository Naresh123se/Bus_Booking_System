import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faGauge, faTicket, faBusSimple, faUsers, faFileLines} from '@fortawesome/free-solid-svg-icons';


const AIndex = () => {
    
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // Assuming isAdmin state



  useEffect(() => {
    // Check if the user is logged in from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Update isAdmin state based on the login status
    setIsAdmin(isLoggedIn);

    // If user is not logged in, redirect to the login page
    if (!isLoggedIn) {
      navigate('admin/loginpage'); // Redirect to your login page route
    }
  }, [navigate]);


  const handleClick = () => {
  navigate('/admin/Booking');
  };
  const Dashboard = () => {
  navigate('/admin');
  };

  const Ticket = () => {
  navigate('/admin/Ticket');
  };

  
  return(

<>
<div className=' w-44 bg-[#414E66] text-[#dfdbdb] h-[90vh]  cursor-pointer '>
         <div className>

  <div className='flex gap-3 text-[18px] hover:bg-[#4f5e7a] pl-4 pt-1 pb-1' onClick={Dashboard} >

    <div>
     <FontAwesomeIcon icon={faGauge} beatFade /> 
       
     </div>
     <div>
     Dashboard 
    </div>
</div>

<div  className='flex gap-3 text-[18px]  hover:bg-[#4f5e7a] pt-1 pb-1 pl-4' onClick={handleClick} >
    <div>
     <FontAwesomeIcon icon={faUsers} beatFade />   
    </div>
    <div>
    Passengers  
    </div>   
</div>

<div  className='flex gap-3 text-[18px] hover:bg-[#4f5e7a] pt-1 pb-1 pl-4' onClick={Ticket}>
    <div>
     <FontAwesomeIcon icon={faTicket} beatFade />   
    </div>
    <div>
    Ticket  
    </div>
</div>

<div className='flex gap-5 text-[18px] hover:bg-[#4f5e7a] pt-1 pb-1 pl-4'>
    <div>
     <FontAwesomeIcon icon={faBusSimple} beatFade />   
    </div>
    <div>
    Bus 
    </div>
</div>
<div className='flex gap-5 text-[18px] hover:bg-[#4f5e7a] pt-1 pb-1 pl-4'>
    <div>
    <FontAwesomeIcon icon={faFileLines} beatFade/>   
    </div>
    <div>
    Report 
    </div>
</div>

</div>









</div>
  
   
    </>
  )
}
export default AIndex;

