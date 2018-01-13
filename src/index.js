import React from 'react';
import ReactDOM from 'react-dom';

// router and redux
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </BrowserRouter>
  , document.getElementById('root'));

registerServiceWorker();
