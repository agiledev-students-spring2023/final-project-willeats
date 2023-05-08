import * as React from 'react';
import HomeButton from '../profile/HomeButton';
import PageBackButton from '../pagebackButton/PageBackButton';

function TopBar() {
    return (
        <div className='d-flex justify-content-between'>
            <PageBackButton/>
            <HomeButton/>
      </div>
    );
};

export default TopBar;