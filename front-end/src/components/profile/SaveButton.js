import {React, useState} from 'react';
import '../../bootstrap.css';
import './CustomerProfile.css';

function SaveButton() {
    const [showModal, setShowModal] = useState(false);

    const handleSave = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    return (
        <div>
            <button className="btn btn-primary button-round" onClick={handleSave}>
                Save
            </button>

            <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Success</h5>
                            <button type="button" className="close" onClick={handleCloseModal}>
                                <span>&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <p>Changes Saved Successfully</p>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                Close
                            </button>
                        </div>
                    </div>
                    </div>
            </div>
            <div className={`modal-backdrop ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
        </div>
    );
};

export default SaveButton;