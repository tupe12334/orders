import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import Menu from './Menu';

export default function NavBar(props) {
    const [menuDrawerState, setMenuDrawerState] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        //console.log(event);
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMenuDrawerState(open);
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
                <Button color="inherit" style={{ fontWeight: "bold" }} >התחבר</Button>
            </Toolbar>
        </AppBar>
    )
}
