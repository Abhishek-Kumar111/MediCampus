import React, { useState, useEffect } from 'react'
import './medcineModal.css'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const MedicineModal = (props) => {
    const [medicine, setMedicine] = useState({ name: "", quantity: "", usage: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOnChange = (event, key) => {
        setMedicine({ ...medicine, [key]: event.target.value })
    }

    useEffect(() => {
        if (props.clickedMedicine) {
            setMedicine({
                ...medicine,
                name: props.clickedMedicine.name,
                quantity: props.clickedMedicine.quantity,
                usage: props.clickedMedicine.usage
            })
        }
    }, [])

    const updateValue = async () => {
        props.showLoader();
        setIsSubmitting(true);
        await axios.put(
            `http://localhost:4000/api/medicine/update/${props.clickedMedicine._id}`,
            medicine,
            { withCredentials: true }
        ).then((resp) => {
            toast.success("Medicine updated successfully!");
            setTimeout(() => window.location.reload(), 1000);
        }).catch(err => {
            toast.error(err?.response?.data?.error)
        }).finally(() => {
            props.hideLoader();
            setIsSubmitting(false);
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (props.clickedMedicine) {
            updateValue()
            return;
        }

        if (medicine.name.trim().length === 0 || !medicine.quantity || medicine.usage.trim().length === 0) {
            return toast.error("Please enter all fields")
        }
        
        props.showLoader()
        setIsSubmitting(true);
        
        await axios.post(
            'http://localhost:4000/api/medicine/add',
            medicine,
            { withCredentials: true }
        ).then((resp) => {
            toast.success("Medicine added successfully!");
            setTimeout(() => window.location.reload(), 1000);
        }).catch(err => {
            toast.error(err?.response?.data?.error)
        }).finally(() => {
            props.hideLoader();
            setIsSubmitting(false);
        })
    }

    return (
        <form onSubmit={handleSubmit} className="medicine-modal-form">
            <div className='register-form-div'>
                <div className='register-input-box'>
                    <input
                        value={medicine.name}
                        onChange={(event) => handleOnChange(event, "name")}
                        className='input-box-register'
                        placeholder='Medicine Name'
                        type='text'
                        required
                        disabled={isSubmitting}
                    />
                </div>
                <div className='register-input-box'>
                    <input
                        value={medicine.quantity}
                        onChange={(event) => handleOnChange(event, "quantity")}
                        className='input-box-register'
                        placeholder='Quantity'
                        type='number'
                        min="1"
                        required
                        disabled={isSubmitting}
                    />
                </div>
                <div className='register-input-box'>
                    <input
                        value={medicine.usage}
                        onChange={(event) => handleOnChange(event, "usage")}
                        className='input-box-register'
                        placeholder='Usage'
                        type='text'
                        required
                        disabled={isSubmitting}
                    />
                </div>
            </div>
            <button 
                type='submit' 
                className='form-btn reg-btn'
                disabled={isSubmitting}
            >
                {isSubmitting 
                    ? (props.clickedMedicine ? "Updating..." : "Adding...") 
                    : (props.clickedMedicine ? "Update" : "Add")
                }
            </button>
            <ToastContainer />
        </form>
    )
}

export default MedicineModal