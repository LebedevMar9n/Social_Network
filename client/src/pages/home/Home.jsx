import React from 'react';

import { ProfileSide, PostSide, RightSide } from '../../components';
import './Home.css';




function Home() {
    return (
        <div className='Home'>
            <div className='profileSide'><ProfileSide /></div>
            <div className='postSide'><PostSide /></div>
            <div className='rightSide'><RightSide /></div>
        </div>
    );
}

export { Home };
