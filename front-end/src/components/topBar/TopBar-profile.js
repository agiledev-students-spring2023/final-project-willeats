import * as React from 'react';
import PageBackButton from '../pagebackButton/PageBackButton';
import ProfileButton from '../ProfileButton/ProfileButton';

function TopBar_profile() {
    return (
        <div className='row d-flex justify-content-between'>
            <PageBackButton/>
            <ProfileButton/>
        </div>
    );
};

export default TopBar_profile;