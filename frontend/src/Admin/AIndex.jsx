import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge, faTicket, faBusSimple, faUsers, faFileLines, faLocationDot  } from '@fortawesome/free-solid-svg-icons';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
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

  const Passenger = () => {
    handleClick('Passenger');
  };
  const Bus = () => {
    handleClick('Bus');
  };

  const Schedule = () => {
    handleClick('Schedule');
  };

  const handleReportClick = () => {
    handleClick('Report');
  };
  const handleDestinationClick = () => {
    handleClick('Des');
  };
  const handleBlogClick = () => {
    handleClick('Blog');
  };

 

  return (
    <>
      <div className='w-44 bg-[#414E66] text-[#dfdbdb] h-[671px] cursor-pointer overflow-hidden '>
        <div>
          <div className={`flex gap-5 text-[18px] hover:bg-[#4f5e7a] pl-4 pt-1 pb-1 ${activeNavItem === '' ? 'bg-[#4f5e7a]' : ''}`} onClick={Dashboard}>
            <div>
              <FontAwesomeIcon icon={faGauge}  />
            </div>
            <div cl>
              Dashboard
            </div>
          </div>

          <div className={`flex gap-4 text-[18px] hover:bg-[#4f5e7a] pl-4 pt-1 pb-1 ${activeNavItem === 'Passenger' ? 'bg-[#4f5e7a]' : ''}`} onClick={Passenger}>
            <div>
              <FontAwesomeIcon icon={faUsers}  />
            </div>
            <div>
              Passengers
            </div>
          </div>

          <div className={`flex gap-6 text-[18px] hover:bg-[#4f5e7a] pt-1 pb-1 pl-4 ${activeNavItem === 'Bus' ? 'bg-[#4f5e7a]' : ''}`} onClick={Bus}>
            <div>
              <FontAwesomeIcon icon={faBusSimple} />
            </div>
            <div>
              Bus
            </div>
          </div>
          <div className={`flex gap-2 text-[18px] hover:bg-[#4f5e7a] pt-1 pb-1 pl-3  ${activeNavItem === 'Schedule' ? 'bg-[#4f5e7a]' : ''}`} onClick={Schedule}>
          <div style={{ animation: 'heartbeat 1.5s infinite' }}>
      
    <DepartureBoardIcon sx={{fontSize: 26}} />
    </div>
            
            <div className='mr'>
            Schedule
            </div>
          </div>
          <div className={`flex gap-5 text-[18px] hover:bg-[#4f5e7a] pt-1 pb-1 pl-4 ${activeNavItem === 'Report' ? 'bg-[#4f5e7a]' : ''}`} onClick={handleReportClick}>
            <div>
              <FontAwesomeIcon icon={faFileLines}  />
            </div>
            <div>
              Report
            </div>
          </div>

          <div className={`flex gap-5 text-[18px] hover:bg-[#4f5e7a] pt-1 pb-1 pl-4 ${activeNavItem === 'Des' ? 'bg-[#4f5e7a]' : ''}`} onClick={handleDestinationClick}>
            <div>
               <FontAwesomeIcon icon={faTicket} />
            </div>
            <div>
            Coupons
            </div>
          </div>

          <div className={`flex gap-5 text-[18px] hover:bg-[#4f5e7a] pt-1 pb-1 pl-4 ${activeNavItem === 'Des' ? 'bg-[#4f5e7a]' : ''}`} onClick={handleBlogClick}>
            <div>
              <FontAwesomeIcon icon={faLocationDot}/>
            </div>
            <div>
           Blog
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AIndex;
