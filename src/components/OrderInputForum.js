import React from 'react';
import { FormControl, TextField, Button, Typography, CircularProgress } from '@material-ui/core';
import { db } from '../services/firebase';
import { Autocomplete } from '@material-ui/lab';
import cityList from '../services/cityList';
import StreetsList from '../services/StreetsList';
import { Formik, Field, Form } from "formik";
import { DragHandle } from '@material-ui/icons';


var t = StreetsList

function sendTextToFireBase(data) {

    if (data != undefined) {
        console.log(data);
        db.ref('orders').push(data);
    }


}

export default function OrderInputForum() {
    /*
    const onChange = event => {
        var tempad = address
        var tar = event.target
        var theId = tar.id.substring(0, tar.id.indexOf('TextField'))
        switch (theId) {
            case "name":
                tempad.name = tar.value
                break;
            case "city":
                tempad.city = tar.value
                break;
            case "street":
                tempad.street = tar.value
                break;
            case "house":
                tempad.house = tar.value
                break;
            default:
            // code block
        }
        SetAd(tempad);
        //console.log(address);*/

    // const onChange = event => { }
    const cityListO = cityList.map((option) => {
        const firstLetter = option[0].toUpperCase();
        //console.log(option)
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            title: option
        };
    }
    
    );
    const initialValues = {
        status: 'inWork',
                    orderSetDate: new Date(),
                    reciverName: "",
                    city: '',
                    street: '',
                    house: ''
      };
    //console.log(cityListO);
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
                                    console.log(value);
                                    setFieldValue(
                                      "city",
                                      value !== null ? value.title : initialValues.city
                                    );
                                  }}
                                noOptionsText="טוען..."
                                renderInput={(params) => <TextField {...params} label="עיר" name="city" type="input" variant="filled" id="city" />}
                                loadingText="טוען..." />
                            <Field label="רחוב" name="street" type="input" variant="filled" as={TextField} />
                            <Field label="ספר בית" name="house" type="input" variant="filled" as={TextField} />
                            <Button variant="contained" color="primary" disabled={isSubmitting} type="submit">{isSubmitting ? <CircularProgress size="1" /> : "שלח"}</Button>
                        </FormControl>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                    </Form>

                )}




            </Formik>

        </div>
    )
}