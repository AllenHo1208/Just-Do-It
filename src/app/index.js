import React from 'react';
import { render } from 'react-dom';
/* The Provider Component just renders whatever you passed to it as children */
import { Provider } from 'react-redux';
// or : const { Provider } = ReactRedux;
// or : var Provider = require('react-redux').Provider;
import { createStore } from 'redux';
import App from './components/App';
import { addTodo, toggleTodo, setVisibilityFilter } from './actions';
import todoApp from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin';
import isMobile from './utils/DeviceChecker';
import GoogleDriveAPI from './GoogleDriveAPI';

if (!isMobile()) {
	$('#root').css({ 'width': '450px', 'zoom': '1.8' });
}

// Needed for onTouchTap : http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = createStore(todoApp);

/*
store.subscribe(() => {
    console.dir(store.getState());
});
*/

window.onload = function () {
	GoogleDriveAPI.handleClientLoad(function (oFile) {
		GoogleDriveAPI.getFileContent(oFile.id, function (oFile, sJson) {
			// console.info(JSON.stringify(oFile));
			oFile.present.todos.forEach(function (todo, index) {
				store.dispatch(addTodo(todo.text));
				if (todo.completed) {
					store.dispatch(toggleTodo(index));
				}
			});
			store.dispatch(setVisibilityFilter(oFile.present.visibilityFilter));
		});
	});
}

$('#save-button').click(function () {
	GoogleDriveAPI.save(store.getState(), function (oFile) {
		GoogleDriveAPI.getFileContent(oFile.id, function (oFile, sJson) {
			console.info('File saved:')
			console.info(oFile);
		});
	});
});

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);