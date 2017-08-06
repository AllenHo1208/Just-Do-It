// Main usabilityFilter Reducer
const usabilityFilter = (state = true, action) => {
	switch (action.type) {
		case 'SET_USABILITY_FILTER':
			return action.filter;
		default:
			return state;
	}
};

export default usabilityFilter;