import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { read, utils, writeFile } from 'xlsx';
// import { v4 as uuid } from 'uuid';

import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { DataGrid } from '@mui/x-data-grid';

// const fileTypes = ['xlsx', 'xls'];
const useFakeMutation = () => {
    return useCallback(
        (excelList) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (excelList.name?.trim() === '') {
                        reject(new Error("Error while saving excelList: name can't be empty."));
                    } else {
                        resolve({ ...excelList, name: excelList.name?.toUpperCase() });
                    }
                }, 200);
            }),
        []
    );
};

function computeMutation(newRow, oldRow) {
    if (newRow.name !== oldRow.name) {
        return `Name from '${oldRow.name}' to '${newRow.name}'`;
    }
    // if (newRow.age !== oldRow.age) {
    //     return `Age from '${oldRow.age || ''}' to '${newRow.age || ''}'`;
    // }
    return null;
}

const Excel = () => {
    const [data, setData] = useState([]);
    const [excelList, setExcelList] = useState([]);
    const [lastRefresh, setLastRefresh] = useState(new Date());

    const mutateRow = useFakeMutation();
    const noButtonRef = useRef(null);
    const [promiseArguments, setPromiseArguments] = useState(null);

    const [snackbar, setSnackbar] = useState(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    const processRowUpdate = useCallback(
        (newRow, oldRow) =>
            new Promise((resolve, reject) => {
                const mutation = computeMutation(newRow, oldRow);
                if (mutation) {
                    // Save the arguments to resolve or reject the promise later
                    setPromiseArguments({ resolve, reject, newRow, oldRow });
                } else {
                    resolve(oldRow); // Nothing was changed
                }
            }),
        []
    );

    const handleNo = () => {
        const { oldRow, resolve } = promiseArguments;
        resolve(oldRow); // Resolve with the old row to not update the internal state
        setPromiseArguments(null);
    };

    const handleYes = async () => {
        const { newRow, oldRow, reject, resolve } = promiseArguments;

        try {
            // Make the HTTP request to save in the backend
            const response = await mutateRow(newRow);
            setSnackbar({ children: 'User successfully saved', severity: 'success' });
            resolve(response);
            setPromiseArguments(null);
        } catch (error) {
            setSnackbar({ children: "Name can't be empty", severity: 'error' });
            reject(oldRow);
            setPromiseArguments(null);
        }
    };

    const handleEntered = () => {
        // The `autoFocus` is not used because, if used, the same Enter that saves
        // the cell triggers "No". Instead, we manually focus the "No" button once
        // the dialog is fully open.
        // noButtonRef.current?.focus();
    };
    const renderConfirmDialog = () => {
        if (!promiseArguments) {
            return null;
        }

        const { newRow, oldRow } = promiseArguments;
        const mutation = computeMutation(newRow, oldRow);

        return (
            <Dialog maxWidth="xs" TransitionProps={{ onEntered: handleEntered }} open={!!promiseArguments}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent dividers>{`Pressing 'Yes' will change ${mutation}.`}</DialogContent>
                <DialogActions>
                    <Button ref={noButtonRef} onClick={handleNo}>
                        No
                    </Button>
                    <Button onClick={handleYes}>Yes</Button>
                </DialogActions>
            </Dialog>
        );
    };

    useEffect(() => {
        axios
            .get('http://localhost/react-api/excel.php')

            .then((response) => {
                setExcelList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [lastRefresh]);

    const handleImport = (event) => {
        const files = event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);

                    rows.forEach((item, index) => {
                        var excel = {
                            id: item.ID,
                            name: item.name,
                            remain: item.remain,
                            unit: item.unit
                        };

                        axios
                            .post('http://localhost/react-api/excel.php', excel)
                            .then((response) => {
                                if ((response.status = 1)) {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'เพิ่ม Item เรียบร้อย',
                                        showConfirmButton: false,
                                        timer: 1500,
                                        width: 600,
                                        padding: '3em',
                                        background: '#ffff'
                                    });
                                    setLastRefresh(new Date());
                                    // setTimeout(function () {
                                    //     window.location.reload();
                                    // }, 1600);
                                } else {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        title: 'เพิ่ม Item ไม่สำเร็จ !!',
                                        showConfirmButton: false,
                                        timer: 1500,
                                        width: 600,
                                        padding: '3em',
                                        background: '#ffff'
                                    });
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    });
                }
            };
            // setData(initailFile.name);
            // console.log(initailData);
            reader.readAsArrayBuffer(file);
            event.target.value = null;
        }
    };

    const requiredData = excelList.map(({ id_mt, name, remain, unit }) => ({ id_mt, name, remain, unit }));

    const handleExport = () => {
        const headings = [['ID', 'name', 'remain', 'unit']];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, requiredData, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'Materail.xlsx');
    };

    const columns = [
        { field: 'id', headerName: '#', width: 70 },
        { field: 'id_mt', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', flex: 1, editable: true },
        { field: 'remain', headerName: 'Remain', type: 'number', width: 130 },
        { field: 'unit', headerName: 'Unit', width: 130 }
    ];

    // const handleEditCellChangeCommitted = (params) => {
    //     console.log('handleEditCellChangeCommitted called');
    //     const { id, field, value } = params.props;
    //     const newData = [...excelList];
    //     const index = newData.findIndex((item) => item.id === id);
    //     newData[index][field] = value;
    //     // setData(newData);
    //     axios
    //         .put('http://localhost/react-api/' + id, newData[index])
    //         .then((response) => {
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };

    return (
        <>
            <div className="row mb-2 mt-5">
                <div className="col-sm-6 offset-3">
                    <div className="row">
                        <div className="col-sm-6">
                            <Button variant="contained" component="label">
                                Upload
                                <input
                                    hidden
                                    multiple
                                    type="file"
                                    name="file"
                                    className="custom-file-input"
                                    id="inputGroupFile"
                                    required
                                    onChange={handleImport}
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                />
                            </Button>
                        </div>
                        <div className="col-sm-6">
                            <Button variant="contained" color="success" onClick={handleExport}>
                                Success
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 offset-3">
                    <div style={{ height: 400, width: '100%' }}>
                        {renderConfirmDialog()}
                        <DataGrid
                            rows={excelList}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            processRowUpdate={processRowUpdate}
                        />
                        {!!snackbar && (
                            <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
                                <Alert {...snackbar} onClose={handleCloseSnackbar} />
                            </Snackbar>
                        )}
                    </div>
                </div>
            </div>
            {/* <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                className="custom-file-input"
                id="inputGroupFile"
                required
                handleImport={handleImport}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            /> */}
        </>
    );
};

export default Excel;
