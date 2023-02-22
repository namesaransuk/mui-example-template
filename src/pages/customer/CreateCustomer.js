import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';

const CreateCustomer = (props) => {
    const initCustomer = {
        id: '',
        CustomerID: '',
        Name: '',
        Surname: '',
        Role: '',
        Salary: '',
        OT: ''
    };

    const [addCustomer, setAddCustomer] = useState(initCustomer);
    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setAddCustomer({ ...addCustomer, [name]: value });
    };

    const saveCustomer = () => {
        var data = {
            // id: addCustomer.,
            CustomerID: addCustomer.CustomerID,
            Name: addCustomer.Name,
            Surname: addCustomer.Surname,
            Role: addCustomer.Role,
            Salary: addCustomer.Salary,
            OT: addCustomer.OT
        };
        axios
            .post('http://localhost/react-api/', data)
            .then((response) => {
                if ((response.status = 1)) {
                    handleClose2();
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
                    props.setRefresh(response.data.data.id);
                    console.log(response);
                    // setTimeout(function () {
                    //     window.location.reload();
                    // }, 1600);
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'เพิ่มพนักงานไม่สำเร็จ !!',
                        showConfirmButton: false,
                        timer: 1500,
                        width: 600,
                        padding: '3em',
                        background: '#ffff'
                    });
                    // setTimeout(function () {
                    //     window.location.reload();
                    // }, 1600);
                }
            })
            .catch((error) => {
                console.log(error);
            });
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
        p: 4
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen1 = () => setOpen(true);
    const handleClose2 = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen1} variant="contained" color="success">
                Add Customer
            </Button>
            <Modal open={open} onClose={handleClose2} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <TextField
                        margin="normal"
                        name="CustomerID"
                        onChange={handleInputChange}
                        value={addCustomer.CustomerID}
                        label="Customer ID"
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        name="Name"
                        onChange={handleInputChange}
                        value={addCustomer.Name}
                        label="Name"
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        name="Surname"
                        onChange={handleInputChange}
                        value={addCustomer.Surname}
                        label="Surname"
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        name="Role"
                        onChange={handleInputChange}
                        value={addCustomer.Role}
                        label="Role"
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        name="Salary"
                        onChange={handleInputChange}
                        value={addCustomer.Salary}
                        label="Salary"
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        name="OT"
                        onChange={handleInputChange}
                        value={addCustomer.OT}
                        label="OT"
                        variant="standard"
                    />
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <Button variant="contained" color="success" onClick={saveCustomer}>
                            ตกลง
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateCustomer;
