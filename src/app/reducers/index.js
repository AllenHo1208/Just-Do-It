import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import undoable, {distinctState} from 'redux-undo';

// Combine all Reducers
let todoApp = combineReducers({
    todos,
    visibilityFilter
});

todoApp = undoable(todoApp, {
    filter: distinctState()
})

export default todoApp;