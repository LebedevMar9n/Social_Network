import React from 'react';

import { FollowersCard, LogoSearch, InfoCard } from '..';

function ProfileLeft() {
    return (
        <div className='ProfileSide'>
            <LogoSearch />
            <InfoCard />
            <FollowersCard />
        </div>
    );
}

export { ProfileLeft };