import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { FacebookOutlined, WechatOutlined } from '@ant-design/icons';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function TabFour() {
    const navigate = useNavigate();

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: '100%',
                bgcolor: 'background.paper'
            }}
        >
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <FacebookOutlined />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Facebook" secondary="July 20, 2014" />
                <Button variant="contained">Connect</Button>
            </ListItem>
            <Divider component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <WechatOutlined />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Line" secondary="July 20, 2014" />
                {/* <Button variant="contained" onClick={() => navigate('/cart')}>
                    Connect
                </Button> */}
            </ListItem>
            {/* <Divider component="li" variant="inset" /> */}
        </List>
    );
}
