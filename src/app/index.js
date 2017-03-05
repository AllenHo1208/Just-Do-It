import React from 'react';
import { render } from 'react-dom';
/* The Provider Component just renders whatever you passed to it as children */
import { Provider } from 'react-redux';
// or : const { Provider } = ReactRedux;
// or : var Provider = require('react-redux').Provider;
import { createStore } from 'redux';
import App from './components/App';
import todoApp from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap : http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = createStore(todoApp);

/*
store.subscribe(() => {
    console.dir(store.getState());
});
*/

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);