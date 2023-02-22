import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
// import confirm from 'reactstrap-confirm';
import Swal from 'sweetalert2';

const DeleteCustomer = (props) => {
    const deleteCustomer = async () => {
        Swal.fire({
            title: 'ลบรายการพนักงาน?',
            text: 'ต้องการดำเนินการใช่หรือไม่!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#588157',
            cancelButtonColor: '#646464',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ปิด'
        }).then((response) => {
            // console.log(response);
            if (response.isConfirmed) {
                let result = axios.delete('http://localhost/react-api/id/' + props.id);
                if ((result.status = 1)) {
                    Swal.fire({
                        position: 'center-center',
                        icon: 'success',
                        title: 'ลบรายการสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    props.setRefresh(props.id);
                    // setTimeout(function () {
                    //     window.location.reload();
                    // }, 1600);
                } else {
                    Swal.fire({
                        position: 'center-center',
                        icon: 'error',
                        title: 'ลบรายการไม่สำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    };

    return (
        <>
            <Button variant="contained" color="error" onClick={deleteCustomer}>
                Delete
            </Button>
        </>
    );
};

export default DeleteCustomer;
