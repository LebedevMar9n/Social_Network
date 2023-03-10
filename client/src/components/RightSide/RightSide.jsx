import React, { useState } from 'react';

import './RightSide.css';
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { TrendCard, ShareModal } from '..';
import { Link } from 'react-router-dom';

function RightSide() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className='RightSide'>
            <div className="navIcons">
                <Link to={'../home'}>
                    <img src={Home} alt="Home" />
                </Link>
                <UilSetting />
                <img src={Noti} alt="" />
                <img src={Comment} alt="" />
            </div>

            <TrendCard />
            <button className='button r-button' onClick={() => setModalOpen(true)}>
                Share
            </button>
            <ShareModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

        </div>
    );
}

export { RightSide };