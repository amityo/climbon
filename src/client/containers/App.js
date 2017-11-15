import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import { BrowserRouter as Router, Route, Link, withRouter, Redirect } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { ListItem } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import { AppNavDrawerWithRouter as AppNavDrawer } from '../components/AppNavDrawer';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

import FontIcon from 'material-ui/FontIcon';
import axios from 'axios';
import Auth from '../modules/Auth';

const baseUrl = "http://localhost:3000/";
const apiBaseUrl = baseUrl + "api/v1/";
const authBaseUrl = baseUrl + "auth/";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: Auth.isUserAuthenticated(),
            navDrawerOpen: false
        }
    }

    componentWillMount() {
        (function () {
            const token = Auth.getToken();
            if (token) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            } else {
                delete axios.defaults.headers.common['Authorization'];
            }
        })();
    }
    
    handleToggle = () => {
        this.setState({ navDrawerOpen: !this.state.navDrawerOpen });
    }

    handleChangeRequestNavDrawer = (open) => {
        this.setState({
            navDrawerOpen: open
        });
    }

    handleLogOut() {
        Auth.deauthenticateUser();
        this.setState({ loggedIn: false });
    }


    render() {
        const { navDrawerOpen, loggedIn } = this.state;

        return (
            <div>
                <Router>
                    <div>
                        <MuiThemeProvider>
                            <AppBar title="Climbon"
                                onLeftIconButtonTouchTap={this.handleToggle}
                                style={appBarStyle}
                                iconElementRight={<FlatButton onClick={this.handleLogOut} label="Log out" />}
                            />
                        </MuiThemeProvider>
                        <AppNavDrawer
                            open={navDrawerOpen}
                            onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
                            onChangeList={this.handleToggle}
                        />
                        <Route exact path="/" render={() =>
                            <Home baseUrl={apiBaseUrl} />}
                        />

                        <Route path="/login" render={() =>
                            <Login baseUrl={authBaseUrl} />}
                        />
                        <Route path="/register" render={() =>
                            <Register baseUrl={authBaseUrl} />}
                        />
                    </div>
                </Router>
            </div>
        );
    }
};

const appBarStyle = {
    marginBottom: "15px"
}