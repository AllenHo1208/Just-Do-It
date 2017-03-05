import React, { PropTypes } from 'react';
import Todo from './Todo'
import { List } from 'material-ui/List';

const TodoList = ({ todos, onTodoItemClick, onDeleteBnClick }) => (
    <List>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onTodoItemClick={() => onTodoItemClick(todo.id)}
                onDeleteBnClick={() => onDeleteBnClick(todo.id)} // the todo.id will bind to the anonymous function : "() => onDeleteBnClick(todo.id)" everytime there is a an update on todos props
            />
        )}
    </List>
);

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        deleted: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoItemClick: PropTypes.func.isRequired,
    onDeleteBnClick: PropTypes.func.isRequired
};

export default TodoList;