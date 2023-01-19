import React from 'react';
import { FollowersCard, LogoSearch, ProfileCard } from '..';

import './ProfileSide.css';

function ProfileSide() {
  return (
    <div className='ProfileSide'>
      <LogoSearch />
      <ProfileCard />
      <FollowersCard />
    </div>
  );
}

export { ProfileSide };