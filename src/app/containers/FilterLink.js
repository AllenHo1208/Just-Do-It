import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.present.visibilityFilter
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter));
        }
    };
};

/* below code return a proper Container Component(provides data & behavior) by
   connecting the props to the Presentational Component Link */
const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);

export default FilterLink;