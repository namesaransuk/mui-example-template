import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';

const EditCustomer = (props) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const initCustomer = {
        id: '',
        CustomerID: '',
        Name: '',
        Surname: '',
        Role: '',
        Salary: '',
        OT: ''
    };

    const [editCustomer, setEditCustomer] = useState(initCustomer);

    useEffect(() => {
        axios.get('http://localhost/react-api/id/' + props.id).then((response) => {
            setEditCustomer(response.data);
        });
    }, [props.id]);

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setEditCustomer({ ...editCustomer, [name]: value });
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        zIndex: '100'
    };

    const saveEditCustomer = () => {
        var data = {
            id: editCustomer.id,
            CustomerID: editCustomer.CustomerID,
            Name: editCustomer.Name,
            Surname: editCustomer.Surname,
            Role: editCustomer.Role,
            Salary: editCustomer.Salary,
            OT: editCustomer.OT
        };

        axios
            .put('http://localhost/react-api/' + props.id, data)
            .then((response) => {
                setEditCustomer({ ...editCustomer, data });
                handleClose();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'เพิ่มพนักงานเรียบร้อย',
                    showConfirmButton: false,
                    timer: 1500,
                    width: 600,
                    padding: '3em',
                    background: '#ffff'
                });
                props.setRefresh(props.id);
                // setTimeout(function () {
                //     window.location.reload();
                // }, 1600);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <Button variant="contained" color="success" onClick={handleOpen}>
                Edit
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    {/* <TextField margin="normal" name="id" onChange={handleInputChange} value={editCustomer.id} label="ID" variant="standard" /> */}
                    <TextField
                        margin="normal"
                        name="CustomerID"
                        onChange={handleInputChange}
                        value={editCustomer.CustomerID}
                        label="Customer ID"
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        name="Name"
                        onChange={handleInputChange}
                        value={editCustomer.Name}
                        label="Name"
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        name="Surname"
                        onChange={handleInputChange}
                        value={editCustomer.Surname}
                        label="Surname"
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        name="Role"
                        onChange={handleInputChange}
                        value={editCustomer.Role}
                        label="Role"
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        name="Salary"
                        onChange={handleInputChange}
                        value={editCustomer.Salary}
                        label="Salary"
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        name="OT"
                        onChange={handleInputChange}
                        value={editCustomer.OT}
                        label="OT"
                        variant="standard"
                    />
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <Button variant="contained" color="success" onClick={saveEditCustomer}>
                            ตกลง
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default EditCustomer;
