import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// material-ui
import {
    Box,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    Select
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import axios from 'axios';
import swal from 'sweetalert';

const TabTwo = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [province, setProvince] = useState([]);
    const [amphure, setAmphure] = useState([]);
    const [tambon, setTambon] = useState([]);

    useEffect(() => {
        axios
            .get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json')
            .then((res) => {
                setProvince(res.data);
            });
    }, []);

    const handleChangeProvince = (setFieldValue) => (event) => {
        const targetId = event.target.value;
        const myObject = province.find((obj) => obj.id == targetId);
        setAmphure(myObject.amphure);
        setFieldValue('zipcode', '');
        setFieldValue('txtprovince', myObject.name_th);
        setFieldValue('idprovince', myObject.id);
    };

    const handleChangeAmphure = (setFieldValue) => (event) => {
        const targetId = event.target.value;
        const myObject = amphure.find((obj) => obj.id == targetId);
        //console.log(myObject);
        setFieldValue('zipcode', '');
        setFieldValue('txtamphure', myObject.name_th);
        setFieldValue('idamphure', myObject.id);
        setTambon(myObject.tambon);
    };

    const handleChangeTambon = (setFieldValue) => (event) => {
        const targetId = event.target.value;

        const myObject = tambon.find((obj) => obj.id == targetId);

        setFieldValue('zipcode', myObject.zip_code);
        setFieldValue('txttambon', myObject.name_th);
        setFieldValue('idtambon', myObject.id);
        //console.log(zip_code);
    };
    return (
        <Formik
            initialValues={{
                company: '',
                txtprovince: user.provinceName,
                idprovince: user.provinceId,
                txtamphure: user.amphureName,
                idamphure: user.amphureId,
                txttambon: user.tambonName,
                idtambon: user.tambonId,
                zipcode: user.zipCode,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                zipcode: Yup.string().max(5).required('Zip codeword is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                // console.log(values); // add this line to log the form values
                try {
                    setStatus({ success: false });
                    setSubmitting(false);
                } catch (err) {
                    console.error(err);
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="company-signup">จังหวัด</InputLabel>
                                <FormControl variant="outlined" fullWidth>
                                    <Select native value={values.txtprovince} onChange={handleChangeProvince(setFieldValue)}>
                                        <option value={values.provinceId}>{values.txtprovince}</option>
                                        {province.map((province) => (
                                            <option key={province.id} value={province.id}>
                                                {province.name_th}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="company-signup">อำเภอ</InputLabel>
                                <FormControl variant="outlined" fullWidth>
                                    <Select native value={values.txtamphure} onChange={handleChangeAmphure(setFieldValue)}>
                                        <option value={values.idamphure}>{values.txtamphure}</option>
                                        {amphure.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name_th}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>

                        <Grid item xs={6} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="company-signup">ตำบล</InputLabel>
                                <FormControl variant="outlined" fullWidth>
                                    <Select native value={values.txttambon} onChange={handleChangeTambon(setFieldValue)}>
                                        <option value={values.idtambon}>{values.txttambon}</option>
                                        {tambon.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name_th}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} md={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="zipcode-signup">รหัสไปรษณีย์*</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id="zipcode"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="zipcode"
                                    value={values.zipcode}
                                    name="zipcode"
                                    placeholder="รหัสไปรษณีย์"
                                    inputProps={{ maxLength: 5 }}
                                />
                                {touched.zipcode && errors.zipcode && (
                                    <FormHelperText error id="helper-text-zipcode-signup">
                                        {errors.zipcode}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

export default TabTwo;
