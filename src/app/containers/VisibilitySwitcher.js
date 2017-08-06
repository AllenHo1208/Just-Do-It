import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Switcher from '../components/Switcher';

const mapStateToProps = (state) => {
	return {
		sValueSelected: state.present.visibilityFilter,
		bIsDisabled: state.present.usabilityFilter
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onChange: (oEvent, sValue) => {
			dispatch(setVisibilityFilter(sValue));
		}
	};
};

/* below code return a proper Container Component(provides data & behavior) by
   connecting the props to the Presentational Component Switcher */
const VisibilitySwitcher = connect(
	mapStateToProps,
	mapDispatchToProps
)(Switcher);

export default VisibilitySwitcher;