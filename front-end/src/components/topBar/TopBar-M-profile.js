import * as React from 'react';
import PageBackButton from '../pagebackButton/PageBackButton';
import ProfileButton from '../ProfileButton/ProfileButton';

function TopBar_Mprofile() {
    return (
        <div className='row d-flex justify-content-between'>
            <PageBackButton/>
            <ProfileButton business={true}/>
        </div>
    );
};

export default TopBar_Mprofile;