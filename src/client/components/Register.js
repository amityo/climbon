import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText } from 'material-ui/Card';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <Card>
                    <CardTitle className="d-flex justify-content-center" title="Register"/>
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
                        Already registered?
                        <Link to="/login" style={registerStyle}>
                            Login Here
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
        console.log("test me");
        const payload = {
            "username": this.state.username,
            "password": this.state.password
        }
        axios.post(this.props.baseUrl + 'register', payload)
            .then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                    console.log("Register successfull");
                }
                else if (response.data.code == 500) {
                    console.log("Error register");
                    alert("Error register")
                }
            })
            .catch(error => console.log(error));
    }
}

Register.propTypes = {
    baseUrl: PropTypes.string
};

const style = {
    margin: 15
};


const registerStyle = {
    marginLeft: '4px'
};