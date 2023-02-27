import React, { useState, useEffect } from 'react';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';

// import { GoogleAuthProvider, signInWithGoogle } from '@react-oauth/google';
// import { GoogleLogin } from '@react-oauth/google';

const Social = () => {
    const [facebook, setFacebook] = useState([]);
    // const [Line, setLine] = useState([]);
    const [google, setGoogle] = useState([]);

    const responseFacebook = (response) => {
        console.log(response);
        setFacebook(response);
    };

    // const handleLoginSuccess = (response) => {
    //     setLine(response);
    // };

    // const handleLoginFailure = (error) => {
    //     console.log(error);
    // };

    // useEffect(() => {
    //     gapi.load('client:auth2', () => {
    //         gapi.auth2.init({ clientId: clientId });
    //     });
    // }, []);

    const responseGoogle = (response) => {
        console.log(response);
        setGoogle(response);
    };

    return (
        <div className="App">
            <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>

            <FacebookLogin
                appId="262990106069627" //APP ID NOT CREATED YET
                fields="name,email,picture"
                callback={responseFacebook}
            />
            <p>Facebook : {facebook.name}</p>
            {facebook.picture && facebook.picture.data && <img src={facebook.picture.data.url} alt="Profile" />}

            <br />
            <br />

            <GoogleLogin
                clientId="967007057143-4v2umd71ffbkl8a6pg3ucdtqaqrvnfkq.apps.googleusercontent.com"
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
            <p>Google : {google.profileObj && google.profileObj.name}</p>
            {google.profileObj && <img src={google.profileObj.imageUrl} alt="Profile" />}
        </div>
    );
};

export default Social;
