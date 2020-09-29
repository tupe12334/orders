import React from 'react';
import { Formik, Field, Form } from "formik";
import { Button, TextField, CircularProgress } from '@material-ui/core';

export default function GeneralForm() {
    return (
        <div>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: ''
                }}
                onSubmit={(data, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        console.log('work');
                        setSubmitting(false)
                        resetForm()
                    }, 5000);
                    console.log(data);


                }}>
                {({ values, isSubmitting }) => (
                    <Form>
                        <Field label="שם פרטי" name="firstName" type="input" as={TextField} />
                        <br />
                        <Field label="שם משפחה" name="lastName" type="input" as={TextField} />
                        <div>
                            <Button variant="contained" color="primary" disabled={isSubmitting} type="submit">{isSubmitting ? <CircularProgress size="1" /> : "שלח"}</Button>
                        </div>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                    </Form>

                )}
            </Formik>

        </div>
    )
}