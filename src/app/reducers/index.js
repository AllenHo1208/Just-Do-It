import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import undoable from 'redux-undo';

// Combine all Reducers
let todoApp = combineReducers({
    todos,
    visibilityFilter
});

todoApp = undoable(todoApp);

export default todoApp;