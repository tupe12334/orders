import { Divider, List, ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Routes from '../../../pages/Routes';


export default function Menu() {
    const activeRoute = (routeName) => {
        return window.location.pathname === routeName ? true : false;
    }
    return (
        <div>
            <div>
                <Typography variant='inherit' display="block" style={{ textAlign: "center", fontSize: "25px" }}>תפריט ראשי</Typography>
            </div>
            <Divider variant="middle" />
            <List>
                <MenuList>
                    {Routes.map((prop, key) => {
                        return (
                            <NavLink to={prop.path} style={{ textDecoration: 'none' }} key={key}>
                                <MenuItem selected={activeRoute(prop.path)}>
                                    <ListItemIcon ><Icon>{prop.icon}</Icon></ListItemIcon>
                                    <ListItemText primary={prop.sidebarName} style={{ color: "black" }} />
                                </MenuItem>
                            </NavLink>
                        )
                    })}
                </MenuList>
            </List>
        </div>
    )
}