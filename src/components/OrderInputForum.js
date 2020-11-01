import { Button, CircularProgress, FormControl, Snackbar, TextField, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';
import { Field, Form, Formik } from "formik";
import { TextField as TF } from 'formik-material-ui';
import React, { useEffect, useState } from 'react';
import { number, object } from 'yup';
import OrderStatusEnum from '../assets/OrderStatusEnum';
import { sendObjectToFireBase } from '../services/firebase';
import getCityList from '../services/GovAPI/cityList';
import getStreets from "../services/GovAPI/StreetsList";



const useStyles = makeStyles((MyTheme) => ({
  }));
  



export default function OrderInputForum() {
    const classes = useStyles();

    var cityListO = []
    //var streetListO = []
    const [streetList, setStreetList] = useState([])
    const [streetListO, setStreetListO] = useState([])
    const [cityList, setCityList] = useState([])
    const [citySelected, setCitySelected] = useState(false)
    const [submitAlertStatus, setSubmitAlertStatus] = useState(false)
    const initialValues = {
        status: OrderStatusEnum.received,
        orderSetDate: new Date(),
        reciverName: "",
        city: '',
        street: '',
        house: '',
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
    const handleOpenAlert = () => {
        setSubmitAlertStatus(true);
      };
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
                    
                    sendObjectToFireBase(data)
                    resetForm()
                    handleOpenAlert()
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
            <Snackbar open={submitAlertStatus} autoHideDuration={6000}>
                <MuiAlert elevation={6} variant="filled" severity="success">
                    ההזמנה התקבלה בהצלחה!
               </MuiAlert>
            </Snackbar>
        </div >
    )
}