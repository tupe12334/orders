import { Button } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';


export default function Home() {
    return (
        <div>
            <br/>
            <div>
                404 דף לא קיים אנא נווט לדף הבית ע"י לחיצה
            </div>
            <br/>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">כאן</Button>
            </NavLink>
        </div>
    )
}