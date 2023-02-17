import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import SwipeableViews from 'react-swipeable-views';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TabOne from './user-tab/TabOne';
import TabTwo from './user-tab/TabTwo';
import TabThree from './user-tab/TabThree';

const user = JSON.parse(localStorage.getItem('user'));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const ProfileData = () => {
    const [tabcount, setTabcount] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabcount(newValue);
    };

    return (
        <Box sx={{ width: '100%', mt: 3 }}>
            <Card sx={{ bgcolor: '#efebe9' }}>
                <CardContent>
                    <Tabs
                        textColor="#efebe9"
                        indicatorColor="primary"
                        value={tabcount}
                        onChange={handleChange}
                        aria-label="primary tabs example"
                    >
                        <Tab label="Profile"></Tab>
                        <Tab label="Address"></Tab>
                        <Tab label="Other"></Tab>
                    </Tabs>
                </CardContent>
            </Card>

            <Paper sx={{ maxWidth: '100%', mt: 1 }}>
                <Card>
                    <CardContent>
                        <SwipeableViews index={tabcount} onChangeIndex={handleChange}>
                            <TabPanel value={tabcount} index={0}>
                                <TabOne></TabOne>
                            </TabPanel>
                            <TabPanel value={tabcount} index={1}>
                                <TabTwo></TabTwo>
                            </TabPanel>
                            <TabPanel value={tabcount} index={2}>
                                <TabThree></TabThree>
                            </TabPanel>
                        </SwipeableViews>
                    </CardContent>
                </Card>
            </Paper>
        </Box>
    );
};

export default ProfileData;
