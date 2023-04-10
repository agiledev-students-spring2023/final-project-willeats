import * as React from 'react';
import ProfileButton from '../ProfileButton/ProfileButton';

function TopBar() {
    return (
        <div className='row d-flex justify-content-between'>
            <ProfileButton business={false}/>
      </div>
    );
};

export default TopBar;