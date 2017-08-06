import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import usabilityFilter from './usabilityFilter';
import progressController from './progressController';
import undoable from 'redux-undo';

// Combine all Reducers
let todoApp = combineReducers({
	todos,
	visibilityFilter,
	usabilityFilter,
	progressController
});

todoApp = undoable(todoApp);

export default todoApp;