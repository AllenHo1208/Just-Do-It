// worker todo reducer
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

// main todos reducer
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

// main visibility reducer
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};
/* Action Creators */
/* You might think that this kind of code is boilerplate and you'd rather dispatch the
   action in line inside the component. However, don't underestimate how action creators
   document your software, because they tell your team what kinds of actions the components
   can dispatch, and this kind of information can be invaluable in large applications. */
let nextTodoId = 0;
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  };
};
const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};
const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};

const { Component } = React;
const { combineReducers } = Redux;
const { createStore } = Redux;
const { connect } = ReactRedux;
/* The Provider Component just renders whatever you passed to it as children */
const { Provider } = ReactRedux;
  // import { Provider } from 'react-redux';
  // var Provider = require('react-redux').Provider;


// combine all reducers
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

// Link presentational component
const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a href='#' onClick={e => {
      e.preventDefault();
      onClick();
    }}>
      {children}
    </a>
  );
};

const mapStateToLinkProps = (
  state,
  ownProps
) => {
  return {
    active : ownProps.filter === state.visibilityFilter
  };
};
const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick : () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};
// FilterLink container component, provides data & behavior
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter='SHOW_ALL' >
      All
    </FilterLink>
    {' '}
    <FilterLink filter='SHOW_ACTIVE' >
      Active
    </FilterLink>
    {' '}
    <FilterLink filter='SHOW_COMPLETED' >
      Completed
    </FilterLink>
 </p>
);

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration:completed ? 'line-through': 'none'
    }}>
    {text}
 </li>
);

/* A Presentational Component */
const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
       <Todo
         key={todo.id}
         {...todo}
         onClick={() => onTodoClick(todo.id)}
        />
    )}
  </ul>
);

/* The AddTodo can neither classify as a Container Component or a Presentational Component.
   As the input & the button are the presentational part,
   but dispatching an action onClick is the behavior which is usually specified by the container.
   
   However, in this case, I'd rather keep them together because there isn't any
   state, the UI is very simple. It's hard to imagine other behaviors other than
   dispatching the ADD_TODO action. */
let AddTodo = ({ dispatch}) => { // receive context as the 2nd argument
// -> const AddTodo = (props, store = context.store) => {
  let input;
  return (
    <div>
      <input ref={node => {
          input = node;
        }} />
        <button onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';
        }}>Add Todo</button>
    </div>
  );
};
/* The connect() code without any arugments generate a Container
   Component that does not subscribe to this store.
   However, that will pass dispatch to the component that it wraps.
   In this case, it wraps my AddTodo component. */
AddTodo = connect()(AddTodo);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
};

const mapStateToTodoListProps = (state) => {
  return {
    todos : getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick : (id) => {
      dispatch(toggleTodo(id));
    }
  };
};
/* below code return a proper Container Component */
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

const ToDoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <ToDoApp />
  </Provider>,
  document.getElementById('root')
);