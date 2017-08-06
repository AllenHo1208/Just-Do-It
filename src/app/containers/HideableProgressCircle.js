import { connect } from 'react-redux';
import ProgressCircle from '../components/ProgressCircle';

const mapStateToProps = (state) => {
	return {
		bIsShown: state.present.progressController
	};
};

const HideableProgressCircle = connect(
	mapStateToProps
)(ProgressCircle);

export default HideableProgressCircle;