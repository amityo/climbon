import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import axios from 'axios';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import SendRouteForm from '../components/SendRouteForm';

import { deepOrange300 } from 'material-ui/styles/colors';

const style = { margin: '7px' };
const availableStyle = { marginLeft: '10px', marginRight: "5px" };

export default class ClimbRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            routeId: props.routeId,
            route: {
                setters: [],
                location: {},
                userRoute: []
            }
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    isRouteCompleted() {
        return this.state.route.userRoute.length > 0;
    }

    handleRouteAdded(routeId) {
        this.fetchRoute(routeId);
    }

    fetchRoute(routeId) {
        axios.get(this.props.baseUrl + 'routes/' + routeId)
            .then(response => this.setState({ route: response.data }))
            .catch(err => console.log(err));
    }

    componentWillReceiveProps(nextProps) {
        // If routeId changed - fetch the new route
        if (nextProps.routeId != this.state.routeId) {
            this.setState({ routeId: nextProps.routeId })
            this.fetchRoute(nextProps.routeId);
        }
    }

    componentDidMount() {
        this.fetchRoute(this.state.routeId);
    }

    render() {
        const { route } = this.state;

        return (
            <MuiThemeProvider>
                <Card>
                    <CardHeader
                        title={route.type}
                        subtitle={route.setupDate}
                        avatar={<Avatar
                            color={deepOrange300}
                            backgroundColor={route.color}
                            size={30}
                            style={style}
                        >{route.grade}</Avatar>}
                    />
                    <CardText style={style}>
                        <div>
                            {/* todo: to mini component */}
                            <FontIcon style={availableStyle} className="material-icons">{route.isAvailable ? "visibility" : "visibility_off"}</FontIcon>
                            <strong>{route.isAvailable ? "Available" : "End Date:"}</strong> {route.endDate}
                        </div>
                        <div>
                            <FontIcon style={style} className="material-icons">pan_tool</FontIcon>
                            <strong>Setters:</strong> {route.setters.join(', ')}
                        </div>
                        <div>
                            <FontIcon style={style} className="material-icons">room</FontIcon>
                            <strong>Location:</strong> {route.location.name}
                        </div>
                    </CardText>
                    <CardActions style={style}>
                        <FlatButton
                            label={this.isRouteCompleted() ? "Route Completed" : "Add Route"}
                            icon={<FontIcon className="material-icons">{this.isRouteCompleted() ? "done" : "add_circle_outline"}</FontIcon>}
                            onClick={this.handleOpen}
                            disabled={this.isRouteCompleted()}
                        />

                        <SendRouteForm
                            onRouteAdded={() => this.handleRouteAdded(this.state.routeId)}
                            onRequestCompleteClose={this.handleClose}
                            open={this.state.open}
                            route={this.state.route}
                            baseUrl={this.props.baseUrl}
                        />
                    </CardActions>
                </Card>
            </MuiThemeProvider>
        );
    }
}

ClimbRoute.propTypes = {
    baseUrl: PropTypes.string,
    routeId: PropTypes.number
};
