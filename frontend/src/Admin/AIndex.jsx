import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faGauge, faTicket, faBusSimple, faUsers } from '@fortawesome/free-solid-svg-icons';


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

 




  return(

<>
   

<div className='border border-1 border-bg-[#46546C] size-[15%]  bg-bg1 '>
         <div className>

   <div  className='flex gap-3 text-[20px] hover:bg-hover  pl-4'>
    <div>
     <FontAwesomeIcon icon={faGauge} beatFade />   
     </div>
     <div>
     Dashboard 
    </div>
</div>

<div  className='flex gap-3 text-[20px] hover:bg-hover pl-4'>
    <div>
     <FontAwesomeIcon icon={faUsers} beatFade />   
    </div>
    <div>
    Passengers  
    </div>
</div>

<div  className='flex gap-3 text-[20px] hover:bg-hover pl-4'>
    <div>
     <FontAwesomeIcon icon={faTicket} beatFade />   
    </div>
    <div>
    Ticket  
    </div>
</div>

<div className='flex gap-3 text-[20px] hover:bg-hover pl-4'>
    <div>
     <FontAwesomeIcon icon={faBusSimple} beatFade />   
    </div>
    <div>
    Bus 
    </div>
</div>

</div>









</div>
  
   
    </>
  )
}
export default AIndex;
