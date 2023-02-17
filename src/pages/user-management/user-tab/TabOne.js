import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// material-ui
import { FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import axios from 'axios';
import swal from 'sweetalert';
// ============================|| Tab 1 - Edit Profile ||============================ //

const TabOne = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [level, setLevel] = useState();
    return (
        <Formik
            initialValues={{
                firstname: user.firstName,
                lastname: user.lastName,
                email: user.userEmail,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                firstname: Yup.string().max(255).required('First Name is required'),
                lastname: Yup.string().max(255).required('Last Name is required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
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
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

export default TabOne;
