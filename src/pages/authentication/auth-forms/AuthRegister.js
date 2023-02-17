import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// material-ui
import {
    Box,
    Button,
    Divider,
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
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import axios from 'axios';
import swal from 'sweetalert';
// ============================|| FIREBASE - REGISTER ||============================ //

async function registerUser(credentials) {
    const url = 'http://127.0.0.1:3001/api/register';
    try {
        const response = await axios.post(url, credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        //console.error(error);
        return { msg: error.message, msgId: 2 };
    }
}

const AuthRegister = () => {
    const navigate = useNavigate();

    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    const [province, setProvince] = useState([]);
    const [amphure, setAmphure] = useState([]);
    const [tambon, setTambon] = useState([]);

    useEffect(() => {
        axios
            .get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json')
            .then((res) => {
                setProvince(res.data);
            });

        changePassword('');
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
        <>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    company: '',
                    password: '',
                    txtprovince: '',
                    idprovince: '',
                    txtamphure: '',
                    idamphure: '',
                    txttambon: '',
                    idtambon: '',
                    zipcode: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    firstname: Yup.string().max(255).required('First Name is required'),
                    lastname: Yup.string().max(255).required('Last Name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    zipcode: Yup.string().max(5).required('Zip codeword is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    // console.log(values); // add this line to log the form values
                    try {
                        const response = await registerUser({
                            firstName: values.firstname,
                            lastName: values.lastname,
                            userEmail: values.email,
                            password: values.password,
                            provinceId: values.idprovince,
                            provinceName: values.txtprovince,
                            amphureId: values.idamphure,
                            amphureName: values.txtamphure,
                            tambonId: values.idtambon,
                            tambonName: values.txttambon
                        });

                        if (response.msgId == 0) {
                            setStatus({ success: false });
                            setSubmitting(false);
                            window.location.replace('/');
                        } else {
                            swal('Failed', response.msg, 'error');
                        }
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
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                                    <OutlinedInput
                                        id="firstname-login"
                                        type="firstname"
                                        value={values.firstname}
                                        name="firstname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="ชื่อจริง"
                                        fullWidth
                                        error={Boolean(touched.firstname && errors.firstname)}
                                    />
                                    {touched.firstname && errors.firstname && (
                                        <FormHelperText error id="helper-text-firstname-signup">
                                            {errors.firstname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.lastname && errors.lastname)}
                                        id="lastname-signup"
                                        type="lastname"
                                        value={values.lastname}
                                        name="lastname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="นามสกุล"
                                        inputProps={{}}
                                    />
                                    {touched.lastname && errors.lastname && (
                                        <FormHelperText error id="helper-text-lastname-signup">
                                            {errors.lastname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">จังหวัด</InputLabel>
                                    <FormControl variant="outlined" fullWidth>
                                        <Select native value={values.provinceName} onChange={handleChangeProvince(setFieldValue)}>
                                            <option value="-">เลือกจังหวัด</option>
                                            {province.map((province) => (
                                                <option key={province.id} value={province.id}>
                                                    {province.name_th}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">อำเภอ</InputLabel>
                                    <FormControl variant="outlined" fullWidth>
                                        <Select native value={values.amphureName} onChange={handleChangeAmphure(setFieldValue)}>
                                            <option value="-">เลือกอำเภอ</option>
                                            {amphure.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name_th}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">ตำบล</InputLabel>
                                    <FormControl variant="outlined" fullWidth>
                                        <Select native value={values.tambonName} onChange={handleChangeTambon(setFieldValue)}>
                                            <option value="-">เลือกตำบล</option>
                                            {tambon.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name_th}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
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
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="demo@company.com"
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="helper-text-email-signup">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-signup"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    By Signing up, you agree to our &nbsp;
                                    <Link variant="subtitle2" component={RouterLink} to="#">
                                        Terms of Service
                                    </Link>
                                    &nbsp; and &nbsp;
                                    <Link variant="subtitle2" component={RouterLink} to="#">
                                        Privacy Policy
                                    </Link>
                                </Typography>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Create Account
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption">Sign up with</Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <FirebaseSocial />
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthRegister;
