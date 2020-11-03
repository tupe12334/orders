import { jssPreset, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter} from 'react-router-dom'
import { create } from 'jss';
import rtl from 'jss-rtl';
import React, { useState } from 'react';
import './App.css';
import MyTheme from './assets/Themes/MainTheme';
import Body from './components/layout/Body';
import NavBar from './components/layout/NavBar/NavBar';
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
  return (
    <ThemeProvider theme={MyTheme}>
      <StylesProvider jss={jss}>
        <BrowserRouter>
        <div className="App" dir="rtl">
          <NavBar />
          <Body />
        </div>
        </BrowserRouter>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
