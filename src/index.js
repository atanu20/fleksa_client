import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};
const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
);

ReactDOM.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
  document.getElementById('root')
);
