const progressController = (state = true, action) => {
	switch (action.type) {
		case 'UPDATE_PROGRESS':
			return action.filter;
		default:
			return state;
	}
};

export default progressController;