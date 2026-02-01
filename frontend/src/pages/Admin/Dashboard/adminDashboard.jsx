import React, { useState } from 'react';
import './adminDashboard.css';
import Modal from '../../../components/Modal/modal';
import ManageStaff from './ManageStaff/manageStaff';
import ManageEvent from './ManageEvent/manageEvent';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MedicationIcon from '@mui/icons-material/Medication';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BusinessIcon from '@mui/icons-material/Business';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';

const AdminDashboard = (props) => {
    const [manageStaffModal, setmanageStaffModal] = useState(false);
    const [eventModal, setEventModal] = useState(false);

    const openCloseModal = (value) => {
        if (value === "event") {
            setEventModal(prev => !prev);
        } else {
            setmanageStaffModal(prev => !prev);
        }
    };

    let userInfo = localStorage.getItem("userInfo") 
        ? JSON.parse(localStorage.getItem("userInfo")) 
        : null;

    return (
        <div className='adminDashboard'>
            <div className='welcome-header'>
                <div className='welcome-admin'>🎯 Welcome To Admin Panel</div>
                <div className='welcome-admin-right-side'>
                    {userInfo?.role === "admin" && (
                        <button 
                            className='manage-staff-btn' 
                            onClick={() => openCloseModal("staff")}
                        >
                            <PeopleIcon style={{ fontSize: '18px', marginRight: '6px' }} />
                            Manage Staffs
                        </button>
                    )}
                    <button 
                        className='manage-staff-btn' 
                        onClick={() => openCloseModal("event")}
                    >
                        <EventIcon style={{ fontSize: '18px', marginRight: '6px' }} />
                        Events
                    </button>
                </div>
            </div>

            <div className='admin-dashboard-cards'>
                <Link to={'/admin/register-student'} className='admin-dashboard-card'>
                    <PersonAddIcon style={{ fontSize: '32px', marginBottom: '8px' }} />
                    <div>Register Student</div>
                </Link>
                <Link to={'/admin/manage-medicine'} className='admin-dashboard-card'>
                    <MedicationIcon style={{ fontSize: '32px', marginBottom: '8px' }} />
                    <div>Manage Medicines</div>
                </Link>
                <Link to={'/admin/record'} className='admin-dashboard-card'>
                    <DescriptionIcon style={{ fontSize: '32px', marginBottom: '8px' }} />
                    <div>Records</div>
                </Link>
                <Link to={'/admin/facility'} className='admin-dashboard-card'>
                    <LocalHospitalIcon style={{ fontSize: '32px', marginBottom: '8px' }} />
                    <div>Facilities</div>
                </Link>
                <Link to={'/admin/nearByHospital'} className='admin-dashboard-card'>
                    <BusinessIcon style={{ fontSize: '32px', marginBottom: '8px' }} />
                    <div>Near By Hospitals</div>
                </Link>
                <Link to={'/admin/gallary'} className='admin-dashboard-card'>
                    <PhotoLibraryIcon style={{ fontSize: '32px', marginBottom: '8px' }} />
                    <div>Gallery</div>
                </Link>
            </div>

            {manageStaffModal && (
                <Modal 
                    value={"staff"} 
                    handleClose={openCloseModal} 
                    header={"Manage Staffs"} 
                    children={
                        <ManageStaff 
                            showLoader={props.showLoader} 
                            hideLoader={props.hideLoader}
                        />
                    } 
                />
            )}
            
            {eventModal && (
                <Modal 
                    value={"event"} 
                    handleClose={openCloseModal} 
                    header={"Manage Events"} 
                    children={
                        <ManageEvent  
                            showLoader={props.showLoader} 
                            hideLoader={props.hideLoader} 
                        />
                    } 
                />
            )}
        </div>
    );
};

export default AdminDashboard;