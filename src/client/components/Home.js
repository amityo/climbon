import React from 'react';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText, CardTitle, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import Auth from '../modules/Auth';
import ClimbRoute from '../components/ClimbRoute';


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeId: 215
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Card className="my-container">
                        <CardTitle title="Home" />
                        <CardText>Welcome to Climbon. Your personal climbing tracking site.</CardText>
                        {Auth.isUserAuthenticated() ?
                            <div>Welcome!</div>
                            : (<div>Please login</div>)}
                        <CardActions>
                            <TextField type="number" defaultValue={215} onChange={(e, val) => this.setState({ routeId: parseInt(val) })} hintText="route id"></TextField>
                        </CardActions>
                    </Card>

                    <br />
                    {Auth.isUserAuthenticated() ?
                        <ClimbRoute routeId={this.state.routeId} baseUrl={this.props.baseUrl} /> : null}
                </div>
            </MuiThemeProvider>
        );
    }
}

Home.propTypes = {
    baseUrl: PropTypes.string
};