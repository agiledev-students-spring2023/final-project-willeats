import * as React from 'react';
import ProfileButton from '../ProfileButton/ProfileButton';

function TopBar() {
    return (
        <div className='d-flex justify-content-between'>
            <ProfileButton/>
      </div>
    );
};

export default TopBar;