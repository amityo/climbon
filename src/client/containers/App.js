import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Home } from '../components/Home';
import { Login } from '../components/Login';
import { Register } from '../components/Register';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { ListItem } from 'material-ui/List';
import { AppNavDrawerWithRouter as AppNavDrawer } from '../components/AppNavDrawer';

const apiBaseUrl = "http://localhost:3000/";
const authBaseUrl = apiBaseUrl + "auth/";


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navDrawerOpen: false
        }
    };

    handleToggle = () => {
        this.setState({ navDrawerOpen: !this.state.navDrawerOpen });
    }

    handleChangeRequestNavDrawer = (open) => {
        this.setState({
            navDrawerOpen: open
        });
    }
    
    render() {
        return (
            <Router>
                  <div>
                    <AppNavDrawer
                        open={this.state.navDrawerOpen}
                        onRequestChangeNavDrawer={ this.handleChangeRequestNavDrawer}
                        onChangeList={this.handleToggle}
                    />
                    <Route exact path="/" render={() =>
                        <Home handleToggle={this.handleToggle} />}
                    />
                    <Route path="/login" render={() =>
                        <Login baseUrl={authBaseUrl} handleToggle={this.handleToggle} />}
                    />
                    <Route path="/register" render={() =>
                        <Register baseUrl={authBaseUrl} handleToggle={this.handleToggle} />}
                    />
                </div>
            </Router>
        );
    }
};

export const AppWithRouter =App;
