import React, { useState } from 'react';
import './home.css';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ImageIcon from '@mui/icons-material/Image';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AboutUs from '../../components/AboutUs/aboutUs';
import Staff from '../../components/Staffs/staff';
import Facility from '../../components/Facilities/facility';
import NearByHospitals from '../../components/NearByHospitals/nearByHospitals';
import Gallary from '../../components/Gallary/gallary';
import { Link } from 'react-router-dom';

const Home = (props) => {
    const [page, setPage] = useState("About");
    const [rightSideHeader, setRightSideHeader] = useState("About Us");
    const userInfo = localStorage.getItem("userInfo") 
        ? JSON.parse(localStorage.getItem("userInfo")) 
        : null;

    const handleChangeTab = (pagename) => {
        setPage(pagename);
        switch (pagename) {
            case "About":
                setRightSideHeader("About Us");
                break;
            case "Staff":
                setRightSideHeader("Our Staffs");
                break;
            case "Facilities":
                setRightSideHeader("Facilities");
                break;
            case "NearByHospitals":
                setRightSideHeader("Near By Hospitals");
                break;
            case "Gallary":
                setRightSideHeader("Gallery");
                break;
            default:
                setRightSideHeader("About Us");
        }
    };

    const getComponent = () => {
        switch (page) {
            case "About":
                return <AboutUs />;
            case "Staff":
                return <Staff showLoader={props.showLoader} hideLoader={props.hideLoader} />;
            case "Facilities":
                return <Facility showLoader={props.showLoader} hideLoader={props.hideLoader} />;
            case "NearByHospitals":
                return <NearByHospitals showLoader={props.showLoader} hideLoader={props.hideLoader} />;
            case "Gallary":
                return <Gallary showLoader={props.showLoader} hideLoader={props.hideLoader} />;
            default:
                return <AboutUs />;
        }
    };

    return (
        <div className="home">
            <div className="home-container">
                <aside className="home-sidebar">
                    <div className="sidebar-header">
                        <h2>Navigation</h2>
                    </div>
                    
                    <nav className="sidebar-nav">
                        {userInfo && userInfo?.role !== 'student' && (
                            <Link to="/admin/dashboard" className="sidebar-link dashboard-link">
                                <DashboardIcon className="sidebar-icon" />
                                <span>Dashboard</span>
                            </Link>
                        )}
                        
                        {userInfo && userInfo?.role === 'student' && (
                            <Link to={`/student/${userInfo?._id}`} className="sidebar-link profile-link">
                                <PersonIcon className="sidebar-icon" />
                                <span>My Profile</span>
                            </Link>
                        )}

                        <div 
                            className={`sidebar-option ${page === "About" ? "active-option" : ""}`} 
                            onClick={() => handleChangeTab("About")}
                        >
                            <HomeIcon className="sidebar-icon" />
                            <span>About Us</span>
                        </div>

                        <div 
                            className={`sidebar-option ${page === "Staff" ? "active-option" : ""}`} 
                            onClick={() => handleChangeTab("Staff")}
                        >
                            <PeopleAltIcon className="sidebar-icon" />
                            <span>Our Staff</span>
                        </div>

                        <div 
                            className={`sidebar-option ${page === "Facilities" ? "active-option" : ""}`} 
                            onClick={() => handleChangeTab("Facilities")}
                        >
                            <Diversity3Icon className="sidebar-icon" />
                            <span>Facilities</span>
                        </div>

                        <div 
                            className={`sidebar-option ${page === "NearByHospitals" ? "active-option" : ""}`} 
                            onClick={() => handleChangeTab("NearByHospitals")}
                        >
                            <LocalHospitalIcon className="sidebar-icon" />
                            <span>Near By Hospitals</span>
                        </div>

                        <div 
                            className={`sidebar-option ${page === "Gallary" ? "active-option" : ""}`} 
                            onClick={() => handleChangeTab("Gallary")}
                        >
                            <ImageIcon className="sidebar-icon" />
                            <span>Gallery</span>
                        </div>
                    </nav>
                </aside>

                <main className="home-content">
                    <header className="content-header">
                        <h1 className="content-title">{rightSideHeader}</h1>
                        <div className="header-decoration"></div>
                    </header>
                    
                    <section className="content-body">
                        {getComponent()}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Home;