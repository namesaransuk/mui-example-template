import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';
import CreateCustomer from './CreateCustomer';

// import { connect } from 'react-redux';

// const mapStateToProps = function (state) {
//     return {
//         message: 'This is message from mapStateToProps',
//         counter: state.counters || 0
//     };
// };

const Customer = () => {
    const [rows, setRows] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost/react-api/');
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
        { field: 'CustomerID', headerName: 'CustomerID', width: 150 },
        { field: 'Name', headerName: 'Name', flex: 1 },
        { field: 'Surname', headerName: 'Surname', flex: 1 },
        { field: 'Role', headerName: 'Role', width: 150 },
        { field: 'Salary', headerName: 'Salary', width: 150 },
        { field: 'OT', headerName: 'OT', width: 150 },
        {
            // field: 'id',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ margin: 1 }}>
                        <EditCustomer id={params.row.id} setRefresh={setRefresh} />
                    </Box>
                    <Box sx={{ margin: 1 }}>
                        <DeleteCustomer id={params.row.id} setRefresh={setRefresh} />
                    </Box>
                </Box>
            )
        }
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            {/* <Typography>
                <h2>Test Redux - {counter}</h2>
                <Button variant="contained" color="success" onClick={() => dispatch(increment(1))}>
                    +
                </Button>
                <Button variant="contained" color="success" onClick={() => dispatch(decrement(1))}>
                    -
                </Button>
            </Typography> */}
            <Typography align="center" sx={{ width: '100%', mb: 2 }}>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
            </Typography>
            <Typography align="right" sx={{ width: '100%', mb: 2 }}>
                <CreateCustomer setRefresh={setRefresh} />
            </Typography>
            <DataGrid
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

// export default connect(mapStateToProps)(Customer);
export default Customer;
