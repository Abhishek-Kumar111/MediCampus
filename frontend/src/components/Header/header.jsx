import React, { useState, useEffect } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './header.css';

const Header = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [eventpopup, setEventpopup] = useState(false);
  const [helpline, setHelpline] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenPopup = (popup) => {
    if (popup === "event") {
      setEventpopup(true);
    } else {
      setHelpline(true);
    }
  };

  const fetchEvents = async () => {
    await axios.get('http://localhost:4000/api/notification/get')
      .then(response => {
        console.log("fetching data");
        setEvents(response.data.notifications);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (eventpopup) {
      fetchEvents();
    }
  }, [eventpopup]);

  const handleClosePopup = (popup) => {
    if (popup === "event") {
      setEventpopup(false);
    } else {
      setHelpline(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    props.showLoader();
    await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true })
      .then(response => {
        console.log(response);
        props.handleLogin(false);
        localStorage.clear();
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  return (
    <div className='header'>
      {/* Top Bar with College Info */}
      <div className='header-top-bar'>
        <div className='header-college-container'>
          <div className='header-college-left'>
            <img 
              className='header-college-logo' 
              src='https://nitm.ac.in/ckfinder/userfiles/files/NITM.jpg' 
              alt='NIT Meghalaya Logo' 
            />
            <div className='header-college-info'>
              <div className='college-name-hindi'>राष्ट्रीय प्रौद्योगिकी संस्थान मेघालय</div>
              <div className='college-name-english'>National Institute of Technology, Meghalaya</div>
              <div className='college-tagline'>Dispensary Management System</div>
            </div>
          </div>

          <div className='header-college-right'>
            <div className='header-search-bar'>
              <SearchIcon className='search-icon' />
              <input 
                type='text' 
                className='header-search-input' 
                placeholder='Search...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className='header-social-media'>
              <a target='_blank' rel='noopener noreferrer' href='https://www.youtube.com/@nationalinstituteoftechnol4973' className='social-link'>
                <img src='https://cdn-icons-png.flaticon.com/128/3670/3670147.png' alt='YouTube' />
              </a>
              <a target='_blank' rel='noopener noreferrer' href='https://www.facebook.com/NITMgh/' className='social-link'>
                <img src='https://cdn-icons-png.flaticon.com/128/733/733547.png' alt='Facebook' />
              </a>
              <a target='_blank' rel='noopener noreferrer' href='https://x.com/NIT_Meghalaya' className='social-link'>
                <img src='https://cdn-icons-png.flaticon.com/128/5968/5968830.png' alt='Twitter' />
              </a>
              <a target='_blank' rel='noopener noreferrer' href='https://www.instagram.com/nitm.sohra/' className='social-link'>
                <img src='https://th.bing.com/th/id/OIP.0wjhvLpjGf_-r-1lqG3QAQHaHw?rs=1&pid=ImgDetMain' alt='Instagram' />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to={'/'} className={`navbar-link ${location.pathname === "/" ? 'active-link' : ''}`}>
            Home
          </Link>
          
          <Link to={'/stock'} className={`navbar-link ${location.pathname === "/stock" ? 'active-link' : ''}`}>
            Stock View
          </Link>
          
          <div 
            className='navbar-link dropdown-link' 
            onMouseEnter={() => handleOpenPopup("event")} 
            onMouseLeave={() => handleClosePopup("event")}
          >
            <span className='navbar-link-text'>
              New Events <ArrowDropDownIcon className='dropdown-icon' />
            </span>
            {eventpopup && (
              <div className='navbar-dropdown'>
                {events.length > 0 ? (
                  events.map((item, index) => (
                    <div key={index} className='dropdown-item'>
                      <span className='bullet'>•</span>
                      <span>{item.title}</span>
                    </div>
                  ))
                ) : (
                  <div className='dropdown-item no-events'>No new events</div>
                )}
              </div>
            )}
          </div>
          
          <div 
            className='navbar-link dropdown-link' 
            onMouseEnter={() => handleOpenPopup("helpline")} 
            onMouseLeave={() => handleClosePopup("helpline")}
          >
            <span className='navbar-link-text'>
              Helpline <ArrowDropDownIcon className='dropdown-icon' />
            </span>
            {helpline && (
              <div className='navbar-dropdown helpline-dropdown'>
                <div className='dropdown-item'>
                  <strong>Emergency:</strong> 1007
                </div>
                <div className='dropdown-item'>
                  <strong>Dispensary:</strong> 1800-XXX-XXXX
                </div>
              </div>
            )}
          </div>

          <div 
            onClick={props.isLogin ? handleLogout : handleLogin} 
            className={`navbar-link auth-link ${location.pathname === "/login" ? 'active-link' : ''}`}
          >
            {props.isLogin ? (
              <>
                <LogoutIcon className='auth-icon' />
                Logout
              </>
            ) : (
              <>
                <LoginIcon className='auth-icon' />
                Login
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Banner - Only on Homepage */}
      {/* {location.pathname === "/" && (
        <div className='header-banner'>
          <div className='banner-overlay'>
            <h1 className='banner-title'>Welcome to NIT Meghalaya Dispensary</h1>
            <p className='banner-subtitle'>Your Health, Our Priority</p>
          </div>
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV0JtwxcjNmUy0HNfNwUA4bbdNgAExlepqgG2yDgpKR2emOMi79JnaSHAFMHp5FAWbhrA&usqp=CAU" 
            className='banner-image' 
            alt='Dispensary Banner'
          />
        </div>
      )} */}

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Header;