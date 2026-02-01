import React, { useState, useEffect } from 'react';
import './manageStaff.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UpdateIcon from '@mui/icons-material/Update';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageStaff = (props) => {
    const [inputField, setInputField] = useState({ 
        name: "", 
        email: "", 
        password: "", 
        designation: "", 
        mobileNo: "" 
    });
    const [staffs, setStaffs] = useState([]);
    const [clickedStaff, setClickedStaff] = useState(null);

    const handleOnChange = (event, key) => {
        setInputField({ ...inputField, [key]: event.target.value });
    };

    const fetchData = async () => {
        props.showLoader();
        await axios.get("http://localhost:4000/api/auth/get-staff")
            .then((response) => {
                setStaffs(response.data.staffs);
            })
            .catch(err => {
                console.log(err);
                toast.error("Failed to fetch staff data");
            })
            .finally(() => {
                props.hideLoader();
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = async () => {
        props.showLoader();
        await axios.put(
            `http://localhost:4000/api/auth/update-staff/${clickedStaff?._id}`,
            inputField,
            { withCredentials: true }
        )
            .then(response => {
                toast.success("Staff updated successfully!");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })
            .catch(err => {
                toast.error(err?.response?.data?.error || "Failed to update staff");
            })
            .finally(() => {
                props.hideLoader();
            });
    };

    const handleAddStaff = async (e) => {
        e.preventDefault();

        if (clickedStaff) {
            handleUpdate();
            return;
        }

        // Validation
        if (inputField.name.trim().length === 0 || 
            inputField.email.trim().length === 0 || 
            inputField.password.trim().length === 0 || 
            inputField.designation.trim().length === 0 || 
            inputField.mobileNo.trim().length === 0) {
            return toast.error("Please fill all the details");
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputField.email)) {
            return toast.error("Please enter a valid email address");
        }

        // Mobile number validation
        if (inputField.mobileNo.length < 10) {
            return toast.error("Please enter a valid mobile number");
        }

        props.showLoader();
        await axios.post(
            'http://localhost:4000/api/auth/add-staff',
            inputField,
            { withCredentials: true }
        )
            .then((resp) => {
                console.log(resp);
                toast.success(resp.data.message || "Staff added successfully!");
                setStaffs([resp.data.staff, ...staffs]);
                setInputField({ name: "", email: "", password: "", designation: "", mobileNo: "" });
            })
            .catch(err => {
                toast.error(err?.response?.data?.error || "Failed to add staff");
            })
            .finally(() => {
                props.hideLoader();
            });
    };

    const handleOnEditBtn = async (item) => {
        setClickedStaff(item);
        setInputField({ ...inputField, ...item });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setClickedStaff(null);
        setInputField({ name: "", email: "", password: "", designation: "", mobileNo: "" });
    };

    const filterOutData = (id) => {
        let newArr = staffs.filter((item) => item?._id !== id);
        setStaffs(newArr);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this staff member?")) {
            return;
        }

        props.showLoader();
        await axios.delete(
            `http://localhost:4000/api/auth/delete-staff/${id}`,
            { withCredentials: true }
        )
            .then((response) => {
                filterOutData(id);
                toast.success("Staff deleted successfully!");
            })
            .catch(err => {
                toast.error(err?.response?.data?.error || "Failed to delete staff");
            })
            .finally(() => {
                props.hideLoader();
            });
    };

    return (
        <div className='add-staffs-box'>
            <form className={`register-form ${clickedStaff ? 'update-mode' : ''}`}>
                {clickedStaff && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                        padding: '12px 16px',
                        background: 'rgba(245, 158, 11, 0.2)',
                        borderRadius: '10px',
                        color: '#ffffff'
                    }}>
                        <span style={{ fontWeight: '600', fontSize: '15px' }}>
                            📝 Editing: {clickedStaff.name}
                        </span>
                        <CloseIcon 
                            onClick={handleCancelEdit} 
                            style={{ cursor: 'pointer', fontSize: '22px' }}
                            title="Cancel editing"
                        />
                    </div>
                )}

                <div className='register-form-div'>
                    <div className='register-input-box'>
                        <input
                            value={inputField.name}
                            onChange={(event) => handleOnChange(event, "name")}
                            className='input-box-register'
                            type='text'
                            placeholder='Staff Name *'
                            required
                        />
                    </div>
                    <div className='register-input-box'>
                        <input
                            value={inputField.email}
                            disabled={clickedStaff}
                            onChange={(event) => handleOnChange(event, "email")}
                            className='input-box-register'
                            type='email'
                            placeholder='Email ID *'
                            required
                        />
                    </div>
                    {!clickedStaff && (
                        <div className='register-input-box'>
                            <input
                                value={inputField.password}
                                onChange={(event) => handleOnChange(event, "password")}
                                className='input-box-register'
                                type='password'
                                placeholder='Password *'
                                required
                            />
                        </div>
                    )}
                    <div className='register-input-box'>
                        <input
                            value={inputField.designation}
                            onChange={(event) => handleOnChange(event, "designation")}
                            className='input-box-register'
                            type='text'
                            placeholder='Designation *'
                            required
                        />
                    </div>
                    <div className='register-input-box'>
                        <input
                            value={inputField.mobileNo}
                            onChange={(event) => handleOnChange(event, "mobileNo")}
                            className='input-box-register'
                            type='tel'
                            placeholder='Mobile No. *'
                            maxLength={15}
                            required
                        />
                    </div>
                </div>
                <button type='submit' className='form-btn reg-btn' onClick={handleAddStaff}>
                    {!clickedStaff ? (
                        <>
                            <PersonAddIcon style={{ marginRight: '8px', fontSize: '20px' }} />
                            Add Staff
                        </>
                    ) : (
                        <>
                            <UpdateIcon style={{ marginRight: '8px', fontSize: '20px' }} />
                            Update Staff
                        </>
                    )}
                </button>
            </form>

            <div className='list-staffs'>
                {staffs.length === 0 ? (
                    <div style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        padding: '80px 20px',
                        color: '#94a3b8',
                        fontSize: '16px'
                    }}>
                        <PersonAddIcon style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }} />
                        <p>No staff members added yet. Add your first staff member above!</p>
                    </div>
                ) : (
                    staffs.map((item, index) => {
                        return (
                            <div className='list-staff' key={item._id || index}>
                                <div>
                                    <div style={{ fontWeight: '700', marginBottom: '4px' }}>
                                        {item.name}
                                    </div>
                                    <div style={{ 
                                        fontSize: '13px', 
                                        color: '#64748b', 
                                        fontWeight: '400' 
                                    }}>
                                        {item.designation}
                                    </div>
                                </div>
                                <div className='list-staff-btns'>
                                    <div
                                        onClick={() => handleOnEditBtn(item)}
                                        style={{ cursor: "pointer" }}
                                        title="Edit staff"
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <EditIcon />
                                    </div>
                                    <div
                                        onClick={() => handleDelete(item._id)}
                                        style={{ cursor: "pointer" }}
                                        title="Delete staff"
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <DeleteIcon />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default ManageStaff;