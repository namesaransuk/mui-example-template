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
import moment from 'moment';
import 'moment-timezone';

const Calendar = () => {
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
        const initialDate = new Date(date.$y, date.$M, date.$D, date.$H, date.$m, date.$s, date.$ms);
        const bangkokDatetime = moment.tz(initialDate, 'Asia/Bangkok');
        const formattedDatetime = bangkokDatetime.format('YYYY-MM-DD HH:mm:ss');
        console.log(formattedDatetime);
        setStartDate(formattedDatetime);
    };

    const handleEndDateChange = (date) => {
        const initialDate = new Date(date.$y, date.$M, date.$D, date.$H, date.$m, date.$s, date.$ms);
        const bangkokDatetime = moment.tz(initialDate, 'Asia/Bangkok');
        const formattedDatetime = bangkokDatetime.format('YYYY-MM-DD HH:mm:ss');
        console.log(formattedDatetime);
        setEndDate(formattedDatetime);
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

    const handleEventClick = (info) => {
        axios.get('http://localhost/react-api/calendar.php/' + info.event.id).then((response) => {
            // setEventsId(response.data);
            const parsedDateStart = moment(response.data.start, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Bangkok').toDate();
            const parsedDateEnd = moment(response.data.end, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Bangkok').toDate();
            const result = {
                title: response.data.title,
                description: response.data.description,
                start: parsedDateStart,
                end: parsedDateEnd
            };
            setEventsId(result);
            console.log(result);
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenAdd(false);
        setEventsId([]);
    };

    const handleModalEvent = () => {
        setOpenAdd(true);
    };

    const handleAddEvent = () => {
        const data = {
            title: inputs.title,
            description: inputs.description,
            start: startDate,
            end: endDate
        };
        console.log(data);
        axios
            .post('http://localhost/react-api/calendar.php', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
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

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                // initialView={view}
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
                            id="title"
                            name="title"
                            label="title"
                            variant="outlined"
                            value={eventsId.title}
                            required
                            sx={{ marginTop: 1 }}
                            fullWidth
                        />
                        <TextField
                            id="description"
                            label="description"
                            multiline
                            rows={4}
                            defaultValue={eventsId.description}
                            required
                            sx={{ marginTop: 1 }}
                            fullWidth
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker
                                    label="start"
                                    id="start"
                                    name="start"
                                    value={eventsId.start}
                                    ampm={false}
                                    inputFormat="yyyy/MM/dd hh:mm:ss"
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker
                                    label="end"
                                    id="end"
                                    name="end"
                                    value={eventsId.end}
                                    ampm={false}
                                    inputFormat="yyyy/MM/dd hh:mm:ss"
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        {/* <DialogContentText>{eventsId.description}</DialogContentText> */}
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
                    <TextField
                        id="title"
                        name="title"
                        label="title"
                        variant="outlined"
                        onChange={handleChange}
                        required
                        sx={{ marginTop: 1 }}
                        fullWidth
                    />
                    <TextField
                        id="description"
                        name="description"
                        label="description"
                        variant="outlined"
                        onChange={handleChange}
                        multiline
                        rows={4}
                        required
                        sx={{ marginTop: 1 }}
                        fullWidth
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="start" id="start" name="start" onChange={handleStartDateChange} ampm={false} required />
                        </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="end" id="end" name="end" onChange={handleEndDateChange} ampm={false} required />
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
};

export default Calendar;