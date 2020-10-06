import { Card, CardContent, CardHeader } from '@material-ui/core/';
import React, { useEffect, useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import getGeoCoding from "../../services/nominatim.js";
import leafOrange from '../../assets/pin.svg';
import L from 'leaflet';

export default function OneOrder(props) {
    const [order, setOrder] = useState(props.order)
    const [position, setposition] = useState([0, 0])
    const zoom = 13
    useEffect(() => {
        //console.log(props.order);
        if (order.latitude !== "" && order.longitude !== "") {
            setposition([order.latitude, order.longitude])
        }
        else (
            getGeoCoding(props.address, setposition)
        )
        /*
        var fulladdress = props.address.street + " " + props.address.house + " " + props.address.city
        Nominatim.search({ q: fulladdress }, function (err, opts, results) {
            console.log(err);
            console.log(results);
        })*/
        //console.log(position);
    }, [props.order])
    var mapicon = L.icon({
        iconUrl: leafOrange,
        iconSize: [38, 95], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76]
    })
    const marker = (
        <Marker position={position} icon={mapicon}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    )

    const map = (
        < Map style={{ height: "300px" }} center={position} zoom={zoom} className="map" >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {marker}
        </Map >)

    return (
        <Card style={{ margin: "10px" }}>
            <CardHeader
                title={"משלוח אל: " + order.reciverName}
                subheader={props.date}>
            </CardHeader>
            <CardContent>
                <div>
                    {map}
                </div>
            </CardContent>
        </Card>

    )
}