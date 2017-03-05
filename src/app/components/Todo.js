import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500 } from 'material-ui/styles/colors';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';

const Todo = ({ onTodoItemClick, completed, deleted, text, onDeleteBnClick }) => (
    !deleted && <ListItem
        primaryText={text}
        leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
        rightIconButton={
            <IconButton
                onTouchTap={onDeleteBnClick}
            >
                <Delete />
            </IconButton>
        }
        onTouchTap={onTodoItemClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }} />
);

Todo.propTypes = {
    onTodoItemClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    deleted: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    onDeleteBnClick: PropTypes.func.isRequired
};

export default Todo;