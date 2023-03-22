import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cron from 'cron';
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
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import './style.css';

const Calendar = () => {
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [lastRefresh, setLastRefresh] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [inputs, setInputs] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost/react-api/calendar.php');
            const data = response.data;
            const currentTime = new Date();
            const interval = setInterval(() => {
                for (let i = 0; i < data.length; i++) {
                    const timestamp = new Date(data[i].start);
                    if (timestamp === currentTime) {
                        sendNotification();
                    }
                }
            }, 1000);
            return () => clearInterval(interval);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // cron.schedule('* * * * *', () => {
    //     events.forEach((event) => {
    //         if (dayjs().format('YYYY-MM-DD HH:mm:ss') === event.start) {
    //             sendNotification();
    //         }
    //     });
    // });

    const sendNotification = () => {
        axios
            .post('http://localhost/react-api/line-notify.php')

            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (date) => {
        const initialDate = new Date(date.$y, date.$M, date.$D, date.$H, date.$m, date.$s, date.$ms);
        const formattedDatetime = dayjs(initialDate).format('YYYY-MM-DD HH:mm:ss');
        setStartDate(formattedDatetime);
    };

    const handleEndDateChange = (date) => {
        const initialDate = new Date(date.$y, date.$M, date.$D, date.$H, date.$m, date.$s, date.$ms);
        const formattedDatetime = dayjs(initialDate).format('YYYY-MM-DD HH:mm:ss');
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
            const parsedDateStart = dayjs(response.data.start);
            const parsedDateEnd = dayjs(response.data.end);
            const result = {
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
                start: parsedDateStart,
                end: parsedDateEnd
            };

            setInputs(result);
            setOpen(true);
        });
    };

    const handleClose = () => {
        setOpen(false);
        setOpenAdd(false);
        // setInputs({});
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
                    sendNotification();
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

    const handleUpdateEvent = () => {
        Swal.fire({
            title: 'เปลี่ยนแปลงรายการ ?',
            text: 'ต้องการแก้ไขเป็นใช่หรือไม่!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#588157',
            cancelButtonColor: '#646464',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ปิด'
        }).then((response) => {
            if (response.isConfirmed) {
                let data = {
                    id: inputs.id,
                    title: inputs.title,
                    description: inputs.description,
                    start: startDate,
                    end: endDate
                };
                let result = axios.put('http://localhost/react-api/calendar.php', data);
                if ((result.status = 1)) {
                    Swal.fire({
                        position: 'center-center',
                        icon: 'success',
                        title: 'แก้ไขรายการสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setLastRefresh(new Date());
                    handleClose();
                } else {
                    Swal.fire({
                        position: 'center-center',
                        icon: 'error',
                        title: 'แก้ไขรายการไม่สำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setLastRefresh(new Date());
                }
            } else {
                setLastRefresh(new Date());
            }
        });
    };

    // line Notification
    // pCFLltztwiF16wM8CMees2WvuETGTdphzvYZwCgt2Mv

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
            {inputs && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>แก้ไขข้อมูล</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="id"
                            name="id"
                            label="id"
                            variant="outlined"
                            value={inputs.id}
                            required
                            sx={{ marginTop: 1, display: 'none' }}
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            id="title"
                            name="title"
                            label="title"
                            variant="outlined"
                            value={inputs.title}
                            required
                            sx={{ marginTop: 1 }}
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            id="description"
                            name="description"
                            label="description"
                            multiline
                            rows={4}
                            value={inputs.description}
                            required
                            sx={{ marginTop: 1 }}
                            fullWidth
                            onChange={handleChange}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker
                                    label="start"
                                    id="start"
                                    name="start"
                                    defaultValue={inputs.start}
                                    ampm={false}
                                    onChange={handleStartDateChange}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker
                                    label="end"
                                    id="end"
                                    name="end"
                                    defaultValue={inputs.end}
                                    ampm={false}
                                    onChange={handleEndDateChange}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={handleUpdateEvent} color="primary">
                            Update
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
