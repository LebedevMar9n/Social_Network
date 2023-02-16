import React from 'react';

import { PostSide, ProfileCard, ProfileLeft, RightSide } from '../../components';
import './Profile.css';

function Profile() {
    return (
        <div className='Profile'>
            <ProfileLeft />

            <div className="Profile-center">
                <ProfileCard location={'profilePage'} />
                <PostSide />
            </div>
            <RightSide />
        </div>
    );
}

export { Profile };