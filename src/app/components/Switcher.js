import React, { PropTypes } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const Switcher = ({ sValueSelected, onChange, bIsDisabled }) => (
	<RadioButtonGroup name="showStatus"
		valueSelected={sValueSelected}
		onChange={(oEvent, sValue) => {
			onChange(oEvent, sValue);
		}}
	>
		<RadioButton disabled={bIsDisabled} style={{ display: 'inline-block', width: '33%' }} label="All" value="SHOW_ALL" />
		<RadioButton disabled={bIsDisabled} style={{ display: 'inline-block', width: '33%' }} label="Active" value="SHOW_ACTIVE" />
		<RadioButton disabled={bIsDisabled} style={{ display: 'inline-block', width: '33%' }} label="Completed" value="SHOW_COMPLETED" />
	</RadioButtonGroup>
);

Switcher.propTypes = {
	sValueSelected: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	bIsDisabled: PropTypes.bool.isRequired
};

export default Switcher;