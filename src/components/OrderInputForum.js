import React, { useEffect, useState } from 'react';
import { FormControl, TextField, Button, Typography, CircularProgress, Box } from '@material-ui/core';
import { db } from '../services/firebase';
import { Autocomplete } from '@material-ui/lab';
import getCityList from '../services/cityList';
import { Formik, Field, Form } from "formik";
import getStreets from "../services/StreetsList";
import Icon from '@material-ui/core/Icon';






function sendTextToFireBase(data) {
    if (data !== undefined) {
        // console.log(data);
        db.ref('orders').push(data);
    }
}

export default function OrderInputForum() {
    var cityListO = []
    //var streetListO = []
    const [streetList, setStreetList] = useState([])
    const [streetListO, setStreetListO] = useState([])
    const [cityList, setCityList] = useState([])
    const [citySelected, setCitySelected] = useState(false)
    const initialValues = {
        status: 'inWork',
        orderSetDate: new Date(),
        reciverName: "",
        city: '',
        street: '',
        house: ''
    };
    useEffect(() => {
        getCityList(setCityList)
    }, []);
    cityListO = cityList.map((option) => {
        const firstLetter = option[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            title: option
        };
    })
    //console.log(streetList.length);
    useEffect(() => {
        if (streetList !== undefined && streetList !== null) {
            if (streetList.length > 0) {
                setStreetListO(streetList.map((option) => {
                    const firstLetter = option[0].toUpperCase();
                    return {
                        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                        title: option
                    };
                }));
            }
        }

    }, [streetList]);
    //console.log(streetListO);
    const dibug = false
    return (
        <div>
            <Typography color="primary" variant="h3">
                אנא הכנס פרטי הזמנה
            </Typography>
            <Formik
                initialValues={initialValues}
                onSubmit={(data, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    data.DDdate = String(data.orderSetDate.getDate()).padStart(2, 0)
                    data.MMdate = String(data.orderSetDate.getMonth() + 1).padStart(2, 0)
                    data.YYdate = data.orderSetDate.getFullYear()
                    data.MMtime = data.orderSetDate.getMinutes()
                    data.HHtime = data.orderSetDate.getHours()
                    data.SStime = data.orderSetDate.getSeconds()
                    sendTextToFireBase(data)
                    console.log(data);
                    resetForm()

                    setSubmitting(false)
                }}>
                {({ values, isSubmitting, handleChange, setFieldValue }) => (
                    <Form>
                        <FormControl margin="normal" required>
                            <Field label="שם המקבל" name="reciverName" type="input" variant="filled" as={TextField} />
                            <Autocomplete
                                id="city"
                                name="city"
                                options={cityListO}
                                getOptionLabel={(option) => option.title}
                                groupBy={(option) => option.firstLetter}
                                //style={{ width: 300 }}
                                onChange={(e, value) => {
                                    //console.log("enter change city");
                                    //console.log(getStreets(value.title));
                                    if (value) {
                                        //console.log("setStreetList");
                                        getStreets(value.title, setStreetList)
                                        //console.log(getStreetsFromAutoCom(value.title));
                                        //streetListO = getStreetsFromAutoCom(value.title)
                                        setCitySelected(true)
                                    }
                                    else {
                                        setCitySelected(false)
                                        setStreetListO([])
                                    }
                                    //console.log(streetList);
                                    setFieldValue(
                                        "city",
                                        value !== null ? value.title : initialValues.city
                                    );
                                }}
                                noOptionsText="לא נמצא חיפוש מתאים..."
                                renderInput={(params) => <TextField {...params} label="עיר" name="city" type="input" variant="filled" id="city" />}
                                loadingText="טוען..." />
                            <Autocomplete
                                id="street"
                                name="street"
                                options={streetListO ? streetListO : [""]}
                                getOptionLabel={(option) => option.title}
                                groupBy={(option) => option.firstLetter}
                                //style={{ width: 300 }}
                                onChange={(e, value) => {
                                    //console.log(value);
                                    setFieldValue(
                                        "street",
                                        value !== null ? value.title : initialValues.street
                                    );
                                }}
                                noOptionsText={citySelected ? "לא נמצא חיפוש מתאים..." : "לא נבחר עיר"}
                                renderInput={(params) => <TextField {...params} label="רחוב" name="street" type="input" variant="filled" id="street" />}
                                loadingText="טוען..." />
                            <Field label="מספר בית" name="house" type="input" variant="filled" as={TextField} />
                            <Button variant="contained" color="primary" disabled={isSubmitting} type="submit" endIcon={<Icon style={{ transform: "scaleX(-1)" }}>send</Icon>}>{isSubmitting ? <CircularProgress size="1" /> : "שלח"}</Button>
                        </FormControl>
                        {dibug ? <pre>{JSON.stringify(values, null, 2)}</pre> : null}
                    </Form>
                )}
            </Formik>
        </div>
    )
}