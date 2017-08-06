import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const ProgressCircle = ({ bIsShown }) => (
	<div style={{ display: bIsShown ? 'block' : 'none', position: 'absolute', left: '50%', top: '35%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
		<CircularProgress size={60} thickness={5} />
	</div>
);

ProgressCircle.propTypes = {
	bIsShown: PropTypes.bool.isRequired
};

export default ProgressCircle;