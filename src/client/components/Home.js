import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import axios from 'axios';
import PropTypes from 'prop-types';
import Auth from '../modules/Auth';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: []
        }
    }
    componentDidMount() {
        axios.get(this.props.baseUrl + 'routes/active')
            .then(routes => { this.setState({ routes: routes.data }) })
        // .catch(err => console.log("err: " + err));
    }

    render() {
        return (
            <MuiThemeProvider>
                <Card className="my-container">
                    <CardTitle title="Home" />
                    <CardText>Welcome to Climbon. Your personal climbing tracking site.</CardText>
                    {Auth.isUserAuthenticated() ?
                        <div>Welcome!</div>
                        : (<div>Please login</div>)}
                </Card>
            </MuiThemeProvider>
        );
    }
}

Home.propTypes = {
    baseUrl: PropTypes.string
};