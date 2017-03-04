import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
/* The Provider Component just renders whatever you passed to it as children */
import { Provider } from 'react-redux';
// or : const { Provider } = ReactRedux;
// or : var Provider = require('react-redux').Provider;
import todoApp from './reducers';
import App from './components/App';

render(
    <Provider store={createStore(todoApp)}>
        <App />
    </Provider>,
    document.getElementById('root')
);