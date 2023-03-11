import React, { useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First Name', width: 150, editable: true },
    { field: 'lastName', headerName: 'Last Name', width: 150, editable: true },
    { field: 'age', headerName: 'Age', type: 'number', width: 90, editable: true }
];

const initialRows = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 35 },
    { id: 2, firstName: 'Jane', lastName: 'Doe', age: 28 }
];

const DataGridExample = () => {
    const [rows, setRows] = useState(initialRows);

    const handleEditCellChange = ({ id, field, props }) => {
        const newValue = props.value;
        const updatedRows = rows.map((row) => {
            if (row.id === id) {
                return { ...row, [field]: newValue };
            }
            return row;
        });
        setRows(updatedRows);
        updateData(id, field, newValue);
    };

    const updateData = (id, field, newValue) => {
        axios
            .patch(`/api/data/${id}`, { [field]: newValue })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={rows}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                onRowClick={handleEditCellChange}
            />
        </div>
    );
};

export default DataGridExample;
