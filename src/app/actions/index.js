/* Action Creators */
/* You might think that this kind of code is boilerplate and you'd rather dispatch the
   action in line inside the component. However, don't underestimate how action creators
   document your software, because they tell your team what kinds of actions the components
   can dispatch, and this kind of information can be invaluable in large applications. */

let nextTodoId = 0;
export const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    };
};

export const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    };
};

export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};
