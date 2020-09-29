import React from 'react';
import logo from './logo.svg';
import './App.css';
import OrderInputForum from './components/OrderInputForum';
import { db } from './services/firebase';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import { ThemeProvider } from '@material-ui/core/styles';
import MyTheme from './assets/MyTheme'


const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


function App() {
  const [speed, Setspeed] = React.useState(5)
  const speedPath = db.ref().child('speed')
  React.useLayoutEffect(() => {
    speedPath.on('value', snap => {
      tempspeed: snap.val()
      console.log(snap.val());
      Setspeed(snap.val());
    })
  }, []);

  return (
    <ThemeProvider theme={MyTheme}>
      <StylesProvider jss={jss}>
        <div className="App" dir="rtl">
          <OrderInputForum />
        </div>
      </StylesProvider>
    </ThemeProvider>

  );
}

export default App;
