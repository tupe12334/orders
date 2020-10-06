import { jssPreset, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import React from 'react';
import './App.css';
import MyTheme from './assets/MyTheme';
import Body from './components/Body';
import NavBar from './components/NavBar';
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {

  return (

    <ThemeProvider theme={MyTheme}>
      <StylesProvider jss={jss}>
        <div className="App" dir="rtl">
          <NavBar />
          <Body />
        </div>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
