import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { Grid} from '@material-ui/core';
import OneOrder from './OneOrder';

var ordersRef = db.ref('orders')


export default function OrderShow() {
    const [ordersViewToShow, setordersViewToShow] = useState(null)
    useEffect(() => {
        getOrdersFromDB()
    },[]);
    function getOrdersFromDB() {
        ordersRef.on('value', snap => {
            var temp = snap.val()
            var temp2 = Object.entries(temp)
            setordersViewToShow(temp2.map((order) => {
                var thisOrder = order[1]
                //console.log(order[1]);
                var dateformat = thisOrder.DDdate + "/" + thisOrder.MMdate + "/" + thisOrder.YYdate
                var address = { street: thisOrder.street, house: thisOrder.house, city: thisOrder.city }
                //console.log(address);
                //console.log(dateformat);
                return (
                    <Grid key={counter} item>
                        <OneOrder key={counter++} rcivername={order[1].reciverName} date={dateformat} address={address} order={thisOrder} />
                    </Grid>
                )
            })
            )
        })
    }

    var counter = 0
    return (
        <Grid container spacing={2}>
            <Grid item>
                <Grid container justify="center" spacing={2}>
                    {ordersViewToShow}
                </Grid>
            </Grid>
        </Grid>
    )



}