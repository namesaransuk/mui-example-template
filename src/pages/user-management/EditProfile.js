import * as React from 'react';

// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Stack, Avatar } from '@mui/material';

// assets import
import bg_profile from 'assets/images/bg/bg-profile.jpeg';
import avatar1 from 'assets/images/users/avatar-jack.jpg';

// project import
import MainCard from 'components/MainCard';

import ProfileData from './ProfileData';
// ==============================|| Edit Profile PAGE ||============================== //
const user = JSON.parse(localStorage.getItem('user'));
console.log(user);
const EditProfile = () => {
    return (
        <>
            <MainCard title="Edit Profile">
                <Card sx={{ maxWidth: '100%', bgcolor: '#efebe9' }}>
                    <CardActionArea>
                        <CardMedia component="img" height="140" image={bg_profile} alt="green iguana" />
                        <CardContent>
                            <CardContent sx={{ px: 2.5, pt: 3 }}>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <Stack direction="row" spacing={1.25} alignItems="center">
                                            <Avatar alt="profile user" src={user.avatar} sx={{ width: 100, height: 100 }} />
                                            <Stack>
                                                <Typography variant="h4" color="#4e342e">
                                                    {user.name}
                                                </Typography>
                                                <Typography variant="subtitle1" color="#8d6e63">
                                                    {user.email}
                                                </Typography>
                                                {/* <Typography variant="body2" color="textSecondary">
                                                    UI/UX Designer
                                                </Typography> */}
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <ProfileData />
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default EditProfile;
