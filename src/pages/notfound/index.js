import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="main">
                <h1>404</h1>
                <p>
                    It looks like you're lost...
                    <br />
                    That's a trouble?
                </p>
                <button onClick={() => navigate(-1)}>go back</button>
            </div>
        </>
    );
};

export default NotFound;
