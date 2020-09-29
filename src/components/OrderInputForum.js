import React from 'react';
import { FormControl, TextField, Button, Typography } from '@material-ui/core';
import { db } from '../services/firebase';
import { Autocomplete } from '@material-ui/lab';
import cityList from '../services/cityList';
import StreetsList from '../services/StreetsList';

var t = StreetsList

function sendTextToFireBase(data) {

    if (data != undefined) {
        console.log(data);
        db.ref('orders').push(data);
    }

}

export default function OrderInputForum() {
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
        //console.log(address);
    }

    const [address, SetAd] = React.useState({ status: 'inWork' })

    const cityListO = cityList.map((option) => {
        const firstLetter = option[0].toUpperCase();

        //console.log(option)
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            title: option
        };

    });


    //console.log(cityListO);
    return (
        <div>
            <Typography color="primary" variant="h3">
                 אנא הכנס פרטי הזמנה
            </Typography>
            <form>
                <FormControl margin="normal" required>
                    <TextField id="nameTextField" label="שם המקבל" variant="filled" onChange={onChange} />
                    <Autocomplete
                        id="cityTextField"
                        options={cityListO}
                        getOptionLabel={(option) => option.title}
                        groupBy={(option) => option.firstLetter}
                        //style={{ width: 300 }}
                        noOptionsText="טוען..."
                        renderInput={(params) => <TextField  {...params} id="cityTextField" label="עיר" variant="filled" onChange={onChange} />}
                        loadingText="טוען..."
                    />

                    <TextField id="streetTextField" label="רחוב" variant="filled" onChange={onChange} />
                    <TextField id="houseTextField" label="מספר בית" variant="filled" onChange={onChange} />
                    <Button variant="contained" color="primary" onClick={() => { sendTextToFireBase(address) }}>שלח</Button>
                </FormControl>
            </form>

        </div>
    )
}