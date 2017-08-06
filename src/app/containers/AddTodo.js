import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { fullWhite } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import UndoRedo from './UndoRedo';

/* The AddTodo can neither classify as a Container Component or a Presentational Component.
   As the input & the button are the presentational part, but dispatching an action onClick is the behavior which is usually specified by the container.
   However, in this case, I'd rather keep them together because there isn't any state, the UI is very simple.
   It's hard to imagine other behaviors other than dispatching the ADD_TODO action. */

let AddTodo = ({ dispatch, bIsDisabled }) => { // receive context as the 2nd argument
	// -> const AddTodo = (props, store = context.store) => {
	let input;
	return (
		<div>
			<TextField
				disabled={bIsDisabled}
				style={{ width: '45%' }}
				floatingLabelText='Just Do It!'
				id='todoInputField'
			/>
			<FloatingActionButton
				disabled={bIsDisabled}
				secondary={true}
				mini={true}
				style={{ margin: 1 }}
				onClick={() => {
					const oTextField = document.getElementById('todoInputField');
					if (!(oTextField.value + '').trim()) { return; }
					dispatch(addTodo(oTextField.value));
					oTextField.value = '';
				}}
			>
				<ContentAdd color={fullWhite} />
			</FloatingActionButton>
			<UndoRedo />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		bIsDisabled: state.present.usabilityFilter
	};
};

/* The connect() code without any arugments generate a Container
   Component that does not subscribe to this store.
   However, that will pass dispatch to the component that it wraps.
   In this case, it wraps the AddTodo Component. */
AddTodo = connect(
	mapStateToProps
)(AddTodo);

export default AddTodo;