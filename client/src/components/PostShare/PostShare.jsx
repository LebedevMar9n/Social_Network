import React, { useRef, useState } from 'react';
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from 'react-redux';

import './PostShare.css';
import Profile from "../../img/defaultProfile.png";
import { uploadPost } from '../../actions/UploadActoin';

function PostShare() {

    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.postReducer.uploading);
    // Fetching data for newPost
    const { user } = useSelector((state) => state.authReducer.authData);
    const desc = useRef();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
        event.target.value = ''; // for uploading the same image
    };
    const reset = () => {
        setImage(null);
        desc.current.value = '';
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };
        if (image) {
            const data = new FormData();
            data.append('userId', newPost.userId);
            data.append('desc', newPost.desc);
            data.append('image', image);

            try {
                dispatch(uploadPost(data));
            } catch (error) {
                console.log(error);
            }
        } else {
            dispatch(uploadPost(newPost));
        }
        reset();
    };

    return (
        <div className='PostShare'>
            <img src={user.profilePicture ? user.profilePicture : Profile} alt="profilePicture"/>
            <div>
                <input ref={desc} required type="text" placeholder='Whats happening' />
                <div className='postOptions'>
                    <div className='option'
                        style={{ color: 'var(--photo)' }}
                        onClick={() => imageRef.current.click()}
                    >
                        <UilScenery />
                        Photo
                    </div>
                    <div className='option' style={{ color: 'var(--video)' }}>
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className='option' style={{ color: 'var(--location)' }}>
                        <UilLocationPoint />
                        Location
                    </div>
                    <div className='option' style={{ color: 'var(--shedule)' }}>
                        <UilSchedule />
                        Schedule
                    </div>
                    <button className='button ps-button' onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Uploading' : 'Share'}
                    </button>
                    <div style={{ display: 'none' }}>
                        <input type="file" name='myImage' ref={imageRef} onChange={onImageChange} />
                    </div>
                </div>

                {image &&
                    (<div className='previewImage'>
                        <UilTimes onClick={(event) => { setImage(null); }} />
                        <img src={URL.createObjectURL(image)} alt="preview" />
                    </div>)
                }

            </div>
        </div>
    );
}

export { PostShare };