import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { createStore } from 'redux'
// import {Provider} from 'react-redux'
// import {store} from './store'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette:{
    text:{
      primary: '#101828'
    }
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App/>
  </ThemeProvider>,
  document.getElementById('root')
);
// reportWebVitals();
