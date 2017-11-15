import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import Auth from '../modules/Auth';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        return (
            <MuiThemeProvider>
                <Card>
                    <CardTitle className="d-flex justify-content-center" title="Login" />
                    <div className="d-flex justify-content-center">
                        <TextField hintText="Enter your Username" floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({ username: newValue })} />
                        <br />
                    </div>
                    <div className="d-flex justify-content-center">
                        <TextField hintText="Enter your Password" floatingLabelText="Password" type="password"
                            onChange={(event, newValue) => this.setState({ password: newValue })} />
                        <br />
                    </div>
                    <br />
                    <CardText className="d-flex justify-content-center">
                        Not registered?
                        <Link to="/register" style={registerStyle}>
                            Register Here
                        </Link>
                    </CardText>
                    <div className="d-flex justify-content-center">
                        <RaisedButton label="Submit" primary={true} style={style}
                            onClick={(event) => this.handleClick(event)} />
                    </div>
                </Card>
            </MuiThemeProvider>
        );
    }

    handleClick(event) {
        const payload = {
            "username": this.state.username,
            "password": this.state.password
        }
        axios.post(this.props.baseUrl + 'login', payload)
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    Auth.authenticateUser(response.data.token);
                    console.log("Login successfull");
                }
                else if (response.status == 404) {
                    console.log("Error login");
                    alert("Error login")
                }
            })
            .catch(error => console.log("err: " + error));
    }
}

Login.propTypes = {
    baseUrl: PropTypes.string
};

const style = {
    margin: 15
}

const registerStyle = {
    marginLeft: '4px'
};