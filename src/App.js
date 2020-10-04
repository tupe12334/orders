import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import logo from './logo.svg';
import './App.css';
import OrderInputForum from './components/OrderInputForum';
import { db } from './services/firebase';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import MyTheme from './assets/MyTheme'
import GeneralForm from './components/GeneralForm';
import Icon from '@material-ui/core/Icon';



const jss = create({ plugins: [...jssPreset().plugins, rtl()] });




function App() {
  return (
    <ThemeProvider theme={MyTheme}>
      <StylesProvider jss={jss}>
        <div className="App" dir="rtl">
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <Icon>menu</Icon>
              </IconButton>
              <Typography variant="h6" >
                מערך המשלוחים
          </Typography>
              <Button color="inherit" style={{ fontWeight: "bold"}} >התחבר</Button>
            </Toolbar>
          </AppBar>
          <OrderInputForum />
        </div>
      </StylesProvider>
    </ThemeProvider>

  );
}

export default App;
