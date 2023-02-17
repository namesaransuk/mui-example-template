import { useState } from 'react';
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import UsersList from './UsersList';

// project import
import MainCard from 'components/MainCard';
// ==============================|| DASHBOARD - DEFAULT ||============================== //

const AdminDefault = () => {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Users Management</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <UsersList />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default AdminDefault;
