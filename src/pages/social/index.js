import React from 'react';

import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';

const Social = () => {
    const responseFacebook = (response) => {
        console.log(response);
    };

    const responseGoogle = (response) => {
        console.log(response);
        // response.push();
    };

    return (
        <div className="App">
            <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>

            <h2>Facebook : </h2>
            <FacebookLogin
                appId="262990106069627" //APP ID NOT CREATED YET
                fields="name,email,picture"
                callback={responseFacebook}
            />
            <br />
            <br />

            <GoogleLogin
                clientId="967007057143-4v2umd71ffbkl8a6pg3ucdtqaqrvnfkq.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                buttonText="LOGIN WITH GOOGLE"
                scope="https://www.googleapis.com/auth/drive.file"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
        </div>
    );
};

export default Social;
