// Worker todo Reducer
const todo = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false,
                deleted: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            };
        /* OR use below syntax:
        Object.assign({}, state, {
            completed: !state.completed
        }
        */
        case 'REMOVE_TODO':
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                deleted: true
            };
        default:
            return state;
    }
};

// Main todos Reducer
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        case 'REMOVE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

export default todos;