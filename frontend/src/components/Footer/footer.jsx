import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import CloudIcon from '@mui/icons-material/Cloud';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './footer.css';

const Footer = () => {
    const todayDate = new Date();
    
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <div className="footer-logo-section">
                        <img 
                            className="footer-logo" 
                            src="https://nitm.ac.in/ckfinder/userfiles/files/NITM.jpg" 
                            alt="College Logo" 
                        />
                        <div className="footer-college-info">
                            <h3 className="footer-title">National Institute of Technology</h3>
                            <h4 className="footer-subtitle">Meghalaya</h4>
                        </div>
                    </div>
                    <div className="footer-contact">
                        <div className="footer-contact-item">
                            <LocationOnIcon className="footer-icon" />
                            <span>Meghalaya, Sohra 793108</span>
                        </div>
                        <div className="footer-contact-item">
                            <PhoneIcon className="footer-icon" />
                            <span>0364 250 1294</span>
                        </div>
                        <div className="footer-contact-item">
                            <LanguageIcon className="footer-icon" />
                            <a href="https://www.xyz.ac.in" target="_blank" rel="noopener noreferrer">
                                www.xyz.ac.in
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-center">
                    <h3 className="footer-section-title">Important Links</h3>
                    <div className="footer-links">
                        <a href="https://nitm.ac.in/p/anti-ragging-cell-1" target="_blank" rel="noopener noreferrer">
                            Anti-Ragging Initiative
                        </a>
                        <a href="https://nitm.ac.in/Career/" target="_blank" rel="noopener noreferrer">
                            Career Counselling & Placement
                        </a>
                        <a href="https://nitm.ac.in/p/scst-cell-2" target="_blank" rel="noopener noreferrer">
                            Special Cell
                        </a>
                        <a href="https://nitm.ac.in/p/grievance-cell" target="_blank" rel="noopener noreferrer">
                            Grievance Cell
                        </a>
                        <a href="https://nitm.ac.in/p/contact-us-3" target="_blank" rel="noopener noreferrer">
                            Contact Us
                        </a>
                        <a href="https://nitm.ac.in/" target="_blank" rel="noopener noreferrer">
                            Official Website
                        </a>
                    </div>
                </div>

                <div className="footer-right">
                    <div className="footer-brand">
                        <CloudIcon className="footer-brand-icon" />
                        <h3 className="footer-brand-name">XYZ Meghalaya</h3>
                    </div>
                    <div className="footer-date">
                        <p className="today-date">{todayDate.toDateString()}</p>
                        <p className="footer-copyright">
                            © {todayDate.getFullYear()} All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>Dispensary Management System - NIT Meghalaya</p>
            </div>
        </footer>
    );
};

export default Footer;