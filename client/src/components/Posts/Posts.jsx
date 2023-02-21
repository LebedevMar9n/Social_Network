import React, { useEffect } from 'react';
import './Posts.css';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '..';
import { getTimeLinePosts } from '../../actions/PostAction';

function Posts() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const { posts, uploading } = useSelector((state) => state.postReducer);

    useEffect(() => {
        dispatch(getTimeLinePosts(user._id));
    }, []);

    return (
        <div className='Posts'>
            {posts.map((post, id) => {
                return <Post data={post} id={id}  key={id} />;
            })}
        </div>
    );
}

export { Posts };