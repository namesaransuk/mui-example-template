import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
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
    const [lastRefresh, setLastRefresh] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [eventsId, setEventsId] = useState([]);
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    useEffect(() => {
        axios
            .get('http://localhost/react-api/calendar.php')

            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [lastRefresh]);

    const handleEventClick = ({ event }) => {
        // setEventsId(event);
        console.log(event);
        // setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenAdd(false);
    };

    const handleModalEvent = (event) => {
        console.log(event);
        setOpenAdd(true);
    };

    const handleAddEvent = () => {
        axios
            .post(
                'http://localhost/react-api/calendar.php',
                {
                    title: inputs.title,
                    description: inputs.description,
                    start: startDate,
                    end: endDate
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then((response) => {
                // setEvents(response.data);
                if ((response.status = 1)) {
                    handleClose();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'เพิ่มเรียบร้อย',
                        showConfirmButton: false,
                        timer: 1500,
                        width: 600,
                        padding: '3em',
                        background: '#ffff'
                    });
                    setLastRefresh(new Date());
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'เพิ่มไม่สำเร็จ !!',
                        showConfirmButton: false,
                        timer: 1500,
                        width: 600,
                        padding: '3em',
                        background: '#ffff'
                    });
                    setLastRefresh(new Date());
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [view, setView] = useState('dayGridMonth');

    const handleViewChange = (e) => {
        setView(e.target.value);
    };

    return (
        <div>
            {/* <div>
                <label htmlFor="view">View: </label>
                <select id="view" value={view} onChange={handleViewChange}>
                    <option value="dayGridMonth">Month</option>
                    <option value="timeGridWeek">Week</option>
                    <option value="timeGridDay">Day</option>
                    <option value="listMonth">List</option>
                </select>
            </div> */}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView={view}
                views={{
                    dayGridMonth: {
                        titleFormat: { year: 'numeric', month: 'long' }
                    },
                    timeGridWeek: {
                        titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
                    },
                    timeGridDay: {
                        titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
                    },
                    listMonth: {
                        titleFormat: { year: 'numeric', month: 'long' }
                    }
                }}
                events={events}
                selectable={true}
                select={handleModalEvent}
                eventClick={handleEventClick}
                headerToolbar={{
                    start: 'prev,next today',
                    center: 'title',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                }}
            />
            {eventsId && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{eventsId.title}</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="description"
                            name="description"
                            label="description"
                            variant="outlined"
                            value={eventsId.description}
                        />
                        <DialogContentText>{eventsId.description}</DialogContentText>
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
                    <TextField id="title" name="title" label="title" variant="outlined" onChange={handleChange} />
                    <TextField id="description" name="description" label="description" variant="outlined" onChange={handleChange} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="start" id="start" name="start" onChange={handleStartDateChange} />
                        </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="end" id="end" name="end" onChange={handleEndDateChange} />
                        </DemoContainer>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleAddEvent} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Calendar;
