import React, { useState } from 'react';

import './InfoCard.css';
import { UilPen } from "@iconscout/react-unicons";
import { ProfileModal } from '../ProfileModal/ProfileModal';


function InfoCard() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className='InfoCard'>
            <div className='infoHead'>
                <h4>Your info</h4>
                <div>
                    <UilPen width='2rem' height='1.2rem' onClick={() => setModalOpen(true)} />
                    <ProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
                </div>
            </div>
            <div className='info'>
                <span>
                    <b>Status </b>
                </span>
                <span>in Relationship</span>
            </div>
            <div className='info'>
                <span>
                    <b>Lives in </b>
                </span>
                <span>Lviv</span>
            </div>
            <div className='info'>
                <span>
                    <b>Works at </b>
                </span>
                <span>Oblenergo</span>
            </div>
            <button className='button logout-button'>Logout</button>
        </div>
    );
}

export { InfoCard };