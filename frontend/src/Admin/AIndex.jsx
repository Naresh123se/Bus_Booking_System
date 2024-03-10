import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge, faTicket, faBusSimple, faUsers, faFileLines } from '@fortawesome/free-solid-svg-icons';

const AIndex = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAdmin(isLoggedIn);
    if (!isLoggedIn) {
      navigate('/admin/loginpage');
    }
  }, [navigate]);

  const handleClick = (navItem) => {
    navigate(`/admin/${navItem}`);
    setActiveNavItem(navItem);
  };

  const Dashboard = () => {
    handleClick('');
  };

  const Ticket = () => {
    handleClick('Ticket');
  };

  const handleBusClick = () => {
    handleClick('Booking');
  };

  const handleReportClick = () => {
    handleClick('Report');
  };

  return (
    <>
      <div className='w-44 bg-[#414E66] text-[#dfdbdb] h-[671px] cursor-pointer overflow-hidden '>
        <div>
          <div className={`flex gap-3 text-[18px] hover:bg-[#4f5e7a] pl-4 pt-1 pb-1 ${activeNavItem === '' ? 'bg-[#4f5e7a]' : ''}`} onClick={Dashboard}>
            <div>
              <FontAwesomeIcon icon={faGauge} beatFade />
            </div>
            <div>
              Dashboard
            </div>
          </div>
          <div className={`flex gap-3 text-[18px] hover:bg-[#4f5e7a] pl-4 pt-1 pb-1 ${activeNavItem === 'Ticket' ? 'bg-[#4f5e7a]' : ''}`} onClick={Ticket}>
            <div>
              <FontAwesomeIcon icon={faUsers} beatFade />
            </div>
            <div>
              Passengers
            </div>
          </div>
          <div className={`flex gap-3 text-[18px] hover:bg-[#4f5e7a] pt-1 pb-1 pl-4 ${activeNavItem === 'Ticket' ? 'bg-[#4f5e7a]' : ''}`} onClick={Ticket}>
            <div>
              <FontAwesomeIcon icon={faTicket} beatFade />
            </div>
            <div>
              Ticket
            </div>
          </div>
          <div className={`flex gap-5 text-[18px] hover:bg-[#4f5e7a] pt-1 pb-1 pl-4 ${activeNavItem === 'Booking' ? 'bg-[#4f5e7a]' : ''}`} onClick={handleBusClick}>
            <div>
              <FontAwesomeIcon icon={faBusSimple} beatFade />
            </div>
            <div>
              Bus
            </div>
          </div>
          <div className={`flex gap-5 text-[18px] hover:bg-[#4f5e7a] pt-1 pb-1 pl-4 ${activeNavItem === 'Report' ? 'bg-[#4f5e7a]' : ''}`} onClick={handleReportClick}>
            <div>
              <FontAwesomeIcon icon={faFileLines} beatFade />
            </div>
            <div>
              Report
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIndex;
