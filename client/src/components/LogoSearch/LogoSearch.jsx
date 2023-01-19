import React from 'react';
import {UilSearch} from '@iconscout/react-unicons'

import logo from '../../img/logo.png';
import  './LogoSearch.css'

function LogoSearch() {
    return (
        <div className='LogoSearch'>
            <img src={logo} alt="" />
            <div className='Search'>
                <input type="text " placeholder='#Explore' />
                <div className=' s-icon'>
                    <UilSearch />
                </div>
            </div>
        </div>
    );
}

export { LogoSearch };