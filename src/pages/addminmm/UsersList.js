import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Customer = () => {
    const [rows, setRows] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(null);

    const handleUpdateData = () => {
        axios
            .put('http://localhost/react-api/member.php', rows)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost/react-api/member.php');
            setRows(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            // field: 'avatar',
            headerName: 'Image',
            width: 150,
            editable: true,
            renderCell: (params) => <img src={params.avatar} alt="" /> // renderCell will render the component
        },
        { field: 'name', headerName: 'Name', flex: 1, editable: true },
        { field: 'username', headerName: 'Username', width: 150, editable: true },
        { field: 'email', headerName: 'Email', flex: 1, editable: true },
        { field: 'name_en', headerName: 'Role', width: 150, editable: true },
        {
            // field: 'id',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ margin: 1 }}>{/* <EditCustomer id={params.row.id} setRefresh={setRefresh} /> */}</Box>
                    <Box sx={{ margin: 1 }}>{/* <DeleteCustomer id={params.row.id} setRefresh={setRefresh} /> */}</Box>
                </Box>
            )
        }
    ];

    return (
        <div style={{ width: '100%' }}>
            {/* <Typography align="center" sx={{ width: '100%', mb: 2 }}> */}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {/* </Typography> */}
            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                loading={loading}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5
                        }
                    }
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </div>
    );
};

export default Customer;
