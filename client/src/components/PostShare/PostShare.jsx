import React, { useRef, useState } from 'react';
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from 'react-redux';

import './PostShare.css';
import ProfileImage from "../../img/profileImg.jpg";
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
            data.append('file', image);

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
            <img src={ProfileImage} alt="" />
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
                        <input type="file" name='muImage' ref={imageRef} onChange={onImageChange} />
                    </div>
                </div>

                {image &&
                    <div className='previewImage'>
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                }

            </div>
        </div>
    );
}

export { PostShare };