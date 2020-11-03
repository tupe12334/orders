import React, { useState } from 'react';
import { Button, CircularProgress, FormControl, Snackbar, TextField, Typography, InputAdornment, IconButton ,Dialog,DialogTitle } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';
import { Field, Form, Formik } from "formik";
import { TextField as TF } from 'formik-material-ui';
import { number, object } from 'yup';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function Signin(props) {
    const [showPassword, setshowPassword] = useState(false)
    const handleSubmit = (e) => {
        
    }
    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };
    const initialValues = {
        email: "",
        password: ""
    };
    //TODO show and hide password fix
    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(data, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    console.log(data);
                    resetForm()
                    setSubmitting(false)
                }}
                validateSchema={object({
                })
                }>
                {({ values, isSubmitting, handleChange, setFieldValue }) => (
                    <Form>
                        <FormControl margin="normal" required>
                            <Field label="דואר אלקטרוני" name="email" type="input" variant="filled" component={TF} />
                            <Field label="סיסמה" name="password" type={showPassword ? 'text' : 'password'} variant="filled" component={TF} />
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                size="medium"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            <Button variant="contained" color="primary" disabled={isSubmitting} type="submit" endIcon={<Icon style={{ transform: "scaleX(-1)" }}>send</Icon>}>{isSubmitting ? <CircularProgress size="1" /> : "שלח"}</Button>
                        </FormControl>
                    </Form>
                )}
            </Formik>
        </div >
    )
}