import React from 'react';

import './Posts.css';
import { Post } from '..';
import { useDispatch, useSelector } from 'react-redux';

const dispatch = useDispatch();
const { user } = useSelector((state) => state.authReducer.authData);
const { posts, loading } = useSelector((state) => state.postReducer);

function Posts() {
    return (
        <div className='Posts'>
            {PostsData.map((post, id) => {
                return <Post data={post} id={id} />;
            })}
        </div>
    );
}

export { Posts };