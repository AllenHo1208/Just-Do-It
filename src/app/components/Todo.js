import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500 } from 'material-ui/styles/colors';

const Todo = ({ onClick, completed, text }) => (
    <ListItem
        primaryText={text}
        leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
        onTouchTap={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }} />
);

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default Todo;