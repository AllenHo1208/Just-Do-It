import React from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
    <span>
        <FlatButton
            onClick={onUndo}
            disabled={!canUndo}
            label="Undo"
            style={{ minWidth: 'auto', margin: 1 }}
        />
        <FlatButton
            onClick={onRedo}
            disabled={!canRedo}
            label="Redo"
            style={{ minWidth: 'auto', margin: 1 }}
        />
    </span>
);

const mapStateToProps = (state) => {
    return {
        canUndo: state.past.length > 0,
        canRedo: state.future.length > 0
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUndo: () => dispatch(UndoActionCreators.undo()),
        onRedo: () => dispatch(UndoActionCreators.redo())
    };
};

UndoRedo = connect(
    mapStateToProps,
    mapDispatchToProps
)(UndoRedo);

export default UndoRedo;