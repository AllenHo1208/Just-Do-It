import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

/* The AddTodo can neither classify as a Container Component or a Presentational Component.
   As the input & the button are the presentational part, but dispatching an action onClick is the behavior which is usually specified by the container.
   However, in this case, I'd rather keep them together because there isn't any state, the UI is very simple.
   It's hard to imagine other behaviors other than dispatching the ADD_TODO action. */

let AddTodo = ({ dispatch }) => { // receive context as the 2nd argument
    // -> const AddTodo = (props, store = context.store) => {
    let input;
    return (
        <div>
            <input ref={node => {
                input = node;
            }} />
            <button onClick={() => {
                if (!input.value.trim()) { return; }
                dispatch(addTodo(input.value));
                input.value = '';
            }}>Add Todo</button>
        </div>
    );
};

/* The connect() code without any arugments generate a Container
   Component that does not subscribe to this store.
   However, that will pass dispatch to the component that it wraps.
   In this case, it wraps my AddTodo Component. */
AddTodo = connect()(AddTodo);

export default AddTodo;