import React, { useState, useEffect, useCallback } from 'react';
import './manageEvent.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageEvent = (props) => {
    const [title, setTitle] = useState("");
    const [data, setData] = useState([]);

    const fetchData = useCallback(async () => {
        props.showLoader();
        try {
            const resp = await axios.get(`http://localhost:4000/api/notification/get`);
            setData(resp.data.notifications);
        } catch (err) {
            toast.error(err?.response?.data?.error || "Failed to fetch events");
        } finally {
            props.hideLoader();
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        if (title.trim().length === 0) return toast.error("Please Enter Title");
        props.showLoader();
        try {
            const resp = await axios.post(
                'http://localhost:4000/api/notification/add',
                { title },
                { withCredentials: true }
            );
            setData((prev) => [resp.data.notification, ...prev]);
            setTitle("");
        } catch (err) {
            toast.error(err?.response?.data?.error || "Failed to add event");
        } finally {
            props.hideLoader();
        }
    };

    const handleDeleteEvent = async (id) => {
        props.showLoader();
        try {
            await axios.delete(
                `http://localhost:4000/api/notification/delete/${id}`,
                { withCredentials: true }
            );
            setData((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            toast.error(err?.response?.data?.error || "Failed to delete event");
        } finally {
            props.hideLoader();
        }
    };

    return (
        <div className="manage-event-wrapper">
            <div className="manage-event-header">
                <h2 className="manage-event-title">
                    <span className="title-icon">📋</span> Manage Events
                </h2>
                <p className="manage-event-subtitle">{data.length} event{data.length !== 1 ? 's' : ''} currently active</p>
            </div>

            <form onSubmit={handleSubmitEvent} className="manage-event-form">
                <div className="input-wrapper">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="manage-event-input"
                        type="text"
                        placeholder="Enter a new event..."
                    />
                    <button type="submit" className="manage-event-btn">
                        <AddIcon fontSize="small" />
                        <span>Add</span>
                    </button>
                </div>
            </form>

            <div className="manage-event-list">
                {data.length === 0 ? (
                    <div className="manage-event-empty">
                        <span className="empty-icon">🗓️</span>
                        <p>No events yet. Add one above!</p>
                    </div>
                ) : (
                    data.map((item, index) => (
                        <div
                            className="manage-event-item"
                            key={item._id}
                            style={{ animationDelay: `${index * 0.06}s` }}
                        >
                            <span className="event-index">#{index + 1}</span>
                            <p className="event-text">
                                {item.title.length > 60
                                    ? item.title.slice(0, 60) + '...'
                                    : item.title}
                            </p>
                            <button
                                className="event-delete-btn"
                                onClick={() => handleDeleteEvent(item._id)}
                                aria-label="Delete event"
                            >
                                <DeleteIcon fontSize="small" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideCloseButton
                theme="dark"
            />
        </div>
    );
};

export default ManageEvent;