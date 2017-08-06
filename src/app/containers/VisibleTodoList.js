import { connect } from 'react-redux';
import { toggleTodo, removeTodo} from '../actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
    }
};

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.present.todos, state.present.visibilityFilter)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoItemClick: (id) => {
            dispatch(toggleTodo(id));
        },
        onDeleteBnClick: (id) => {
            dispatch(removeTodo(id));
        }
    };
};

/* below code return a proper Container Component(provides data & behavior) by
   connecting the props to the Presentational Component TodoList */
const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

export default VisibleTodoList;