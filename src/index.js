import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import CustomThemeProvider from './providers/CustomThemeProvider';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </CustomThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
