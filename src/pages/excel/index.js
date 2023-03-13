import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { read, utils, writeFile } from 'xlsx';
// import { v4 as uuid } from 'uuid';

import Button from '@mui/material/Button';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '../../../node_modules/@mui/material/index';

const Excel = () => {
    const [data, setData] = useState([]);
    const [excelList, setExcelList] = useState([]);
    const [lastRefresh, setLastRefresh] = useState(new Date());

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
        { field: 'id_mt', headerName: 'ID', width: 70, editable: true },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            editable: true
        },
        { field: 'remain', headerName: 'Remain', type: 'number', width: 130, editable: true },
        { field: 'unit', headerName: 'Unit', width: 130, editable: true }
    ];

    const handleEditCellChangeCommitted = (params) => {
        console.log(params);

        Swal.fire({
            title: 'เปลี่ยนแปลงรายการ ?',
            text: 'ต้องการแก้ไขเป็น "' + params.value + '" ใช่หรือไม่!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#588157',
            cancelButtonColor: '#646464',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ปิด'
        }).then((response) => {
            // console.log(response);
            if (response.isConfirmed) {
                let result = axios.put('http://localhost/react-api/excel.php', {
                    id: params.id,
                    value: params.value,
                    field: params.field
                });
                if ((result.status = 1)) {
                    Swal.fire({
                        position: 'center-center',
                        icon: 'success',
                        title: 'แก้ไขรายการสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setLastRefresh(new Date());
                    // setTimeout(function () {
                    //     window.location.reload();
                    // }, 1600);
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

        // async function updateData() {
        //     const data = {
        //         id: params.id,
        //         value: params.value,
        //         field: params.field
        //     };

        //     const response = await fetch('http://localhost/react-api/excel.php', {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     });

        //     if (response.ok) {
        //         const result = await response.json();
        //         console.log(result);
        //     } else {
        //         console.error('Error:', response.statusText);
        //     }
        // }

        // updateData();
    };

    return (
        <>
            <div className="row mb-2 mt-5">
                <div className="col-sm-6 offset-3">
                    <div className="row">
                        <div className="col-sm-12 text-right">
                            <Box align="right" mb={2}>
                                <Button variant="contained" component="label" sx={{ m: 1 }}>
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
                                <Button variant="contained" color="success" onClick={handleExport} sx={{ m: 1 }}>
                                    Success
                                </Button>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 offset-3">
                    <div style={{ width: '100%' }}>
                        <DataGrid
                            autoHeight
                            editable
                            rows={excelList}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            components={{
                                Toolbar: GridToolbar
                            }}
                            onCellEditCommit={(params) => {
                                handleEditCellChangeCommitted(params);
                            }}
                            // onCellEditStart={handleCellEditStart}
                            // onCellEditStop={handleEditCellChangeCommitted}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Excel;
