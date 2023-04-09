import * as React from 'react';
import PageBackButton from '../pagebackButton/PageBackButton';
import ProfileButton from '../ProfileButton/ProfileButton';

function TopBar_Cprofile() {
    return (
        <div className='row d-flex justify-content-between'>
            <PageBackButton/>
            <ProfileButton business={false}/>
        </div>
    );
};

export default TopBar_Cprofile;