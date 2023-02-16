import React from 'react';
import { FollowersCard, LogoSearch, ProfileCard } from '..';

import './ProfileSide.css';

function ProfileSide() {
  return (
    <div className='ProfileSide'>
      <LogoSearch />
      <ProfileCard location={'homePage'} />
      <FollowersCard />
    </div>
  );
}

export { ProfileSide };