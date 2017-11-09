import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';


export class Home extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar onLeftIconButtonTouchTap={this.props.handleToggle} title="Home" />
                    <div>Home!</div>
                </div>
            </MuiThemeProvider>
        );
    }
};