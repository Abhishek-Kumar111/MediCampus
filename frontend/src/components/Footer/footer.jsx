import React from 'react'
import './footer.css'
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import CloudIcon from '@mui/icons-material/Cloud';
const Footer = () => {

    const todayDate = new Date()
    return (
        <div className='footer'>
            <div className='foooter-left'>
                <img className='footer-logo' src='https://nitm.ac.in/ckfinder/userfiles/files/NITM.jpg' alt='colegeLogo' />
                <div className='footer-text-white'>National Institute of Technology</div>
                <div className='footer-text-white'>Meghalaya</div>
                <div className='footer-text-smaller'>Meghalaya, Sohra 793108</div>
                <div className='footer-text-smaller'><PhoneIcon /> 0364 250 1294</div>
                <div className='footer-text-smaller'><LanguageIcon /> www.xyz.ac.in</div>
            </div>

            <div className='foooter-center'>
                <div className='important-link'>Important Links</div>
                <a href='https://nitm.ac.in/p/anti-ragging-cell-1' target='_blank'>Anti-Ragging Initiative</a>
                <a href='https://nitm.ac.in/Career/' target='_blank'>Career Counselling and Placement Section</a>
                <a href='https://nitm.ac.in/p/scst-cell-2' target='_blank'>Special Cell</a>
                <a href='https://nitm.ac.in/p/grievance-cell' target='_blank'>Grievance Cell</a>
                <a href='https://nitm.ac.in/p/contact-us-3' target='_blank'>Contact Us</a>
                <a href='https://nitm.ac.in/' target='_blank'>College Official Website</a>

            </div>

            <div className='footer-right'>
                <div className='footer-right-name'><CloudIcon/>XYZ Meghalaya</div>
                <div className='today-date-footer'>{todayDate.toDateString()}</div>
            </div>
        </div>
    )
}

export default Footer