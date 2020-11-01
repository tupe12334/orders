import { Card, CardContent, CardHeader, Menu, MenuItem, CardActions, CardActionArea, Button, colors, Collapse, Typography, Icon, makeStyles, ThemeProvider } from '@material-ui/core/';
import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import leafOrange from '../../assets/pin.svg';
import getGeoCoding from "../../services/nominatim.js";
import OrderStatusEnum from '../../assets/OrderStatusEnum';
import { green, purple } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MainTheme from '../../assets/Themes/MainTheme';
import { CssBaseline } from '@material-ui/core';


export default function OneOrder(props) {
    const order = props.order
    const [position, setposition] = useState([0, 0])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [expanded, setExpanded] = React.useState(false);
    const [backGroundColor, setBackGroundColor] = useState(colors.white)
    const [statusIcon, setStatusIcon] = useState(null)
    useEffect(() => {
        setBackgroungColorFunction()
        var tempIconName = ''
        var iconColor = ''
        switch (order.status) {
            case OrderStatusEnum.received:
                tempIconName = "contactless"
                iconColor = 'red'
                break;
            case OrderStatusEnum.inWork:
                tempIconName = "work"
                iconColor = 'Orange'
                break;
            case OrderStatusEnum.done:
                tempIconName = "done"
                iconColor = 'green'
                break;
            default:
                tempIconName = ''
                break;
        }
        var tempIcon = <Icon style={{ color: iconColor }}> {tempIconName}</Icon >
        console.log(tempIcon);
        setStatusIcon(tempIcon)
    }, [order.status]);
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
    }, [order])
    var mapicon = L.icon({
        iconUrl: leafOrange,
        iconSize: [40, 100], // size of the icon
        iconAnchor: [20, 70], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76]
    })

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = (event) => {
        setBackgroungColorFunction()
        setAnchorEl(null);
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const setBackgroungColorFunction = () => {
        //console.log("enter color selection");
        console.log(order.status);
        switch (order.status) {
            case OrderStatusEnum.received:
                setBackGroundColor(colors.red)
                break;
            case OrderStatusEnum.inWork:
                setBackGroundColor(colors.yellow)
                break;
            case OrderStatusEnum.done:
                setBackGroundColor(colors.green)
                break;
            default:
                break;
                console.log(backGroundColor);
        }
    }
    //TODO in iphone cant press the pin auto close
    const marker = (
        <Marker position={position} icon={mapicon} >
            <Popup>
                {order.street + " " + order.house}
                <br />
                {order.city}
            </Popup>
        </Marker>
    )
    const map = (
        < Map style={{ height: "300px" }} center={position} zoom={zoom} className="map" tap touchZoom >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> '
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {marker}
        </Map >)
    return (
        <ThemeProvider theme={MainTheme}>
            <CssBaseline />
            <Card style={{ margin: "10px" }}>
                <CardHeader
                    title={"משלוח אל: " + order.reciverName}
                    subheader={props.date}
                    avatar={statusIcon}>
                </CardHeader>
                <CardActionArea>
                    <CardContent>
                        <div>
                            {map}
                        </div>
                    </CardContent>
                </CardActionArea>
                <CardActions >
                    <Button onClick={handleOpenMenu} color="secondary" variant="contained">{order.status}</Button>
                    <Menu
                        keepMounted
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        {Object.values(OrderStatusEnum).map((statuse, index) => (
                            <MenuItem
                                key={index}
                                selected={statuse === order.status}
                            >
                                {statuse}
                            </MenuItem>
                        ))}
                    </Menu>
                </CardActions>
            </Card>
        </ThemeProvider>
    )
}