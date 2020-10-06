import { Button, CircularProgress, FormControl, TextField, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { Autocomplete } from '@material-ui/lab';
import { Field, Form, Formik } from "formik";
import { TextField as TF } from 'formik-material-ui';
import React, { useEffect, useState } from 'react';
import { number, object } from 'yup';
import getCityList from '../services/cityList';
import { db } from '../services/firebase';
import getStreets from "../services/StreetsList";
import Nominatim from 'nominatim';





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
        house: '',
        lat: '',
        lng: ''
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
                    var fulladdress = data.street + " " + data.house + " " + data.city
                    Nominatim.search({ q: fulladdress }, function (err, opts, results) {
                        console.log("err");
                        console.log(err);
                        console.log("results");
                        console.log(results);
                    })
                    sendTextToFireBase(data)
                    console.log(data);
                    resetForm()
                    setSubmitting(false)
                }}
                validateSchema={object({
                    house: number().min(10),
                    //reciverName: text()
                })
                }>
                {({ values, isSubmitting, handleChange, setFieldValue }) => (
                    <Form>
                        <FormControl margin="normal" required>
                            <Field label="שם המקבל" name="reciverName" type="input" variant="filled" component={TF} />
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
                            <Field label="מספר בית" name="house" type="input" variant="filled" component={TF} />
                            <Button variant="contained" color="primary" disabled={isSubmitting} type="submit" endIcon={<Icon style={{ transform: "scaleX(-1)" }}>send</Icon>}>{isSubmitting ? <CircularProgress size="1" /> : "שלח"}</Button>
                        </FormControl>
                        {dibug ? <pre>{JSON.stringify(values, null, 2)}</pre> : null}
                    </Form>
                )}
            </Formik>
        </div >
    )
}