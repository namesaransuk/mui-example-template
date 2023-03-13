import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function Calendar() {
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [events, setEvents] = useState([
        {
            title: 'Event 1',
            description: 'Event 1 description',
            start: '2023-03-13 10:00:00',
            end: '2023-03-14 12:00:00'
        },
        {
            title: 'Event 2',
            description: 'Event 2 description',
            start: '2023-03-15T14:00:00',
            end: '2023-03-15T16:00:00'
        }
    ]);

    const handleEventClick = ({ event }) => {
        console.log(events);
        setEvents(event);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenAdd(false);
    };

    const handleAddEvent = ({ start, end }) => {
        // const newEvent = {
        //     title: 'New Event',
        //     start,
        //     end,
        //     description: 'New Event description'
        // };
        // setEvents([...events, newEvent]);
        setOpenAdd(true);
    };

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                // initialView="timeGridWeek"
                events={events}
                selectable={true}
                select={handleAddEvent}
                eventClick={handleEventClick}
            />
            {events && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{events.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{events.description}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            <Dialog open={openAdd} onClose={handleClose}>
                <DialogTitle>เพิ่มข้อมูล</DialogTitle>
                <DialogContent>
                    <TextField id="title" label="title" variant="outlined" />
                    <TextField id="description" label="description" variant="outlined" />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="start" />
                        </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="end" />
                        </DemoContainer>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Calendar;
