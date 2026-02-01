import React from 'react';
import './modal.css'; // Use the compact CSS above
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ header, handleClose, children, size = 'md' }) => {
    // Prevent background scroll when modal is open
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Close on ESC key
    React.useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [handleClose]);

    // Close on overlay click
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className={`modal-container modal-${size}`}>
                <div className="modal-header">
                    <h2>{header}</h2>
                    <button 
                        className="modal-close-btn" 
                        onClick={handleClose}
                        aria-label="Close modal"
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;