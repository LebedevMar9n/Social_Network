import React, { useEffect, useState } from 'react';
import { UilPen } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './InfoCard.css';
import { ProfileModal } from '../ProfileModal/ProfileModal';
import { UserAPI } from '../../api';
import { logOut } from '../../actions';


function InfoCard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [profileUser, setProfileUser] = useState({});

    const dispatch = useDispatch();
    const params = useParams();
    const { user } = useSelector((state) => state.authReducer.authData);

    const profileUserId = params.id;

    useEffect(() => {
        const fetchProfileUser = async () => {
            if (profileUserId === user._id) {
                setProfileUser(user);
            } else {
                const profileUser = await UserAPI.getOneById(profileUserId);
                setProfileUser(profileUser);
            }
        };
        fetchProfileUser();
    }, [user]);

const handleLogOut=()=>{
    dispatch(logOut())
}

    return (
        <div className='InfoCard'>
            <div className='infoHead'>
                <h4>Profile info</h4>
                {user._id === profileUserId
                    ? (<div>
                        <UilPen width='2rem' height='1.2rem' onClick={() => setModalOpen(true)} />
                        <ProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
                    </div>)
                    : ("")}

            </div>
            <div className='info'>
                <span>
                    <b>Status </b>
                </span>
                <span>{profileUser.relationship}</span>
            </div>
            <div className='info'>
                <span>
                    <b>Lives in </b>
                </span>
                <span>{profileUser.livesin}</span>
            </div>
            <div className='info'>
                <span>
                    <b>Works at </b>
                </span>
                <span>{profileUser.worksAt}</span>
            </div>
            <button className='button logout-button' onClick={handleLogOut}>Logout</button>
        </div>
    );
}

export { InfoCard };