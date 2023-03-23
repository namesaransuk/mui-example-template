// material-ui
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Stack } from '@mui/material';

// assets
import Google from 'assets/images/icons/google.svg';
import Twitter from 'assets/images/icons/twitter.svg';
import Facebook from 'assets/images/icons/facebook.svg';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import GitHubLogin from 'react-github-login';
import { gapi } from 'gapi-script';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    // useEffect(() => {
    //     gapi.load('client:auth2', () => {
    //         gapi.auth2.init({ clientId: clientId });
    //     });
    // }, []);

    const googleHandler = async (response) => {
        const initailGoogle = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            avatar: response.profileObj.imageUrl,
            role: 2
        };
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(initailGoogle));

        window.location.pathname == '/login' ? navigate('/') : window.location.reload(false);
        console.log(response);
        console.log(initailGoogle);
    };

    // const [userGithub, setUserGithub] = useState([]);
    // const githubHandler = async (response) => {
    //     console.log(response.code);

    //     // const params = new URLSearchParams();
    //     // params.append('client_id', 'fceb8c9464979d77369d');
    //     // params.append('client_secret', 'd6bc79fff5c64e1374e9c717ea8f3d7cff13b8d8');
    //     // params.append('code', response.code);
    //     const accessToken = response.code;
    //     const result = await axios(`https://api.github.com/user`, {
    //         headers: {
    //             Authorization: `Bearer token ${accessToken}`
    //         }
    //     });
    //     // const data = await result.json();
    //     console.log(result);
    //     // setUserData(data);
    // };

    const twitterHandler = (err, data) => {
        console.log(err, data);
    };

    const facebookHandler = async (response) => {
        const initailFacebook = {
            name: response.name,
            email: response.email,
            avatar: response.picture.data.url,
            role: 2
        };
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(initailFacebook));

        window.location.pathname == '/login' ? navigate('/') : window.location.reload(false);
        console.log(response);
        console.log(initailFacebook);
    };

    return (
        <Stack
            direction="row"
            spacing={matchDownSM ? 1 : 2}
            justifyContent={matchDownSM ? 'space-around' : 'space-between'}
            sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
        >
            <GoogleLogin
                clientId="967007057143-4v2umd71ffbkl8a6pg3ucdtqaqrvnfkq.apps.googleusercontent.com"
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={googleHandler}
                onFailure={googleHandler}
                render={(renderProps) => (
                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth={!matchDownSM}
                        startIcon={<img src={Google} alt="Google" />}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >
                        {!matchDownSM && 'Google'}
                    </Button>
                )}
            />
            {/* <GitHubLogin
                clientId="fceb8c9464979d77369d"
                clientSecret="d6bc79fff5c64e1374e9c717ea8f3d7cff13b8d8"
                redirectUri="http://localhost:3006/"
                onSuccess={githubHandler}
            >
                <Button variant="outlined" color="secondary" fullWidth={!matchDownSM} startIcon={<img src={Twitter} alt="Twitter" />}>
                    {!matchDownSM && 'Twitter'}
                </Button>
            </GitHubLogin> */}
            <TwitterLogin authCallback={twitterHandler} consumerKey={CONSUMER_KEY} consumerSecret={CONSUMER_SECRET} />
            <FacebookLogin
                appId="262990106069627" //APP ID NOT CREATED YET
                fields="name,email,picture"
                callback={facebookHandler}
                render={(renderProps) => (
                    <Button
                        // p={5}
                        variant="outlined"
                        color="secondary"
                        fullWidth={!matchDownSM}
                        startIcon={<img src={Facebook} alt="Facebook" />}
                        onClick={renderProps.onClick}
                    >
                        {' '}
                        {!matchDownSM && 'Facebook'}
                    </Button>
                )}
            />
        </Stack>
    );
};

export default FirebaseSocial;
