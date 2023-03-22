import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../bootstrap.css';
import './ProfileButton.css'

function ProfileButton(props) {

    const Navigate = useNavigate()

    const profilePath = props.business ? '/ownerprofile' : '/customerprofile'

    const navigateProfile = () => {
        Navigate(profilePath)
    }

    return (
        <button className="btn profile-button m-1" onClick={navigateProfile}>
          <div className="rounded-circle image-container">
            <img
              src="https://picsum.photos/40/40"
              alt="Profile"
              className="rounded-circle"
            />
          </div>
        </button>
    );
};

export default ProfileButton;