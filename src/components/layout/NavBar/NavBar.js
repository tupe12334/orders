import { AppBar, Button, Dialog, DialogTitle, Drawer, IconButton, Toolbar, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React, { useState } from 'react';
import Signin from '../../Auth/Signin';
import Menu from './Menu';
import SignedInTools from './SignedInTools';

export default function NavBar(props) {
    const [menuDrawerState, setMenuDrawerState] = React.useState(false);
    const [signinPopup, setsigninPopup] = useState(false)
    const toggleDrawer = (open) => (event) => {
        //console.log(event);
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMenuDrawerState(open);
    };
    const handleClickSigninOpenToogle = (open) => (event) => {
        console.log(event);
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setsigninPopup(open);
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                    <Icon>menu</Icon>
                </IconButton>
                <Typography variant="h6" >
                    מערך המשלוחים
                   </Typography>
                <Drawer open={menuDrawerState} onClose={toggleDrawer(false)}>
                    <div
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <Menu />
                    </div>
                </Drawer>
                <SignedInTools />
                <Button color="inherit" style={{ fontWeight: "bold" }} onClick={handleClickSigninOpenToogle(true)}>התחבר</Button>
                <Dialog open={setsigninPopup}>
                    <DialogTitle>התחבר</DialogTitle>
                        <Signin />
                </Dialog>
            </Toolbar>
        </AppBar>
    )
}
