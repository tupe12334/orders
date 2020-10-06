import { Card, CardContent, CardHeader } from '@material-ui/core/';
import React, { useEffect, useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import getGeoCoding from "../../services/nominatim.js";

export default function OneOrder(props) {
    const [position, setposition] = useState([0, 0])
    const zoom = 13
    useEffect(() => {
        /*
        var fulladdress = props.address.street + " " + props.address.house + " " + props.address.city
        Nominatim.search({ q: fulladdress }, function (err, opts, results) {
            console.log(err);
            console.log(results);
        })*/
        getGeoCoding(props.address, setposition)
        //console.log(position);
    }, [props.address])

    return (
        <Card style={{ margin: "10px" }}>
            <CardHeader
                title={"משלוח אל: " + props.rcivername}
                subheader={props.date}>
            </CardHeader>
            <CardContent>
                <Map style={{ height: "300px" }} center={position} zoom={zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                         </Popup>
                    </Marker>
                </Map>
                <p>{position}</p>
            </CardContent>
        </Card>

    )
}