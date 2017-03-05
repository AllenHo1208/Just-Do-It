import React from 'react';
import VisibilitySwitcher from '../containers/VisibilitySwitcher';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blue500, blue700, deepOrange500 } from 'material-ui/styles/colors';

const oTodoAppMuiTheme = getMuiTheme({
    palette: {
        primary1Color: blue500,
        primary2Color: blue700,
        accent1Color: deepOrange500
    },
});

const App = () => (
    <MuiThemeProvider muiTheme={oTodoAppMuiTheme} >
        <div>
            <VisibilitySwitcher />
            <AddTodo />
            <VisibleTodoList />
        </div>
    </MuiThemeProvider>
);

export default App;