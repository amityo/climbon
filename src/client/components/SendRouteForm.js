import React from 'react';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { deepOrange300 } from 'material-ui/styles/colors';

import axios from 'axios';

const style = { paddingLeft: '16px', paddingRight: '16px' };
const DEFAULT_SEND_TYPE = "send";
const SNACK_SUCCESS = "Route Added Successfully";
const SNACK_ERROR = "Error, Route was not added";

export default class SendRouteForm extends React.Component {
    constructor(props) {
        super(props);
        const date = new Date();

        this.state = {
            snackOpen: false,
            message: SNACK_SUCCESS,
            defaultDate: date,
            minDate: date,
            maxDate: date,
            sendType: DEFAULT_SEND_TYPE,
            completionDate: null,
            numberOfTries: null
        }
    }

    handleSendTypeChange = (event, index, value) => this.setState({ sendType: value });
    handleDateChange = (event, date) => this.setState({ completionDate: date });
    handleTriesChange = (e, val) => this.setState({ numberOfTries: parseInt(val) });
    showSnack = (message) => {
        this.setState({ snackOpen: true, message: message });
    }

    /**
     * Reset form if new route is in nextProps
     * @param nextProps 
     */
    componentWillReceiveProps(nextProps) {
        const route = nextProps.route;

        const maxDate = route.isAvailable ?
            this.state.maxDate : new Date(route.endDate);

        if (nextProps.route.id !== this.props.route.id) {
            this.setState({
                sendType: DEFAULT_SEND_TYPE,
                completionDate: null,
                numberOfTries: null,
                minDate: new Date(nextProps.route.setupDate),
                maxDate: maxDate,
                defaultDate: maxDate
            });
        }
    }

    handleOk = () => {
        const { baseUrl, route, onRouteAdded, onRequestCompleteClose } = this.props;
        const { sendType, completionDate, numberOfTries } = this.state;

        axios
            .post(baseUrl + 'users/me/routes', {
                finish_type: sendType,
                completion_date: completionDate,
                number_of_tries: numberOfTries,
                route_id: route.id
            }).then(resp => {
                onRouteAdded();
                this.showSnack(SNACK_SUCCESS);
            }).catch(err => { this.showSnack(SNACK_ERROR) });

        onRequestCompleteClose();
    }

    render() {
        const { route, open, onRequestCompleteClose } = this.props;

        const actions = [
            <FlatButton label="Cancel" onClick={onRequestCompleteClose} />,
            <FlatButton label="Ok" onClick={this.handleOk} />,
        ];

        return (
            <MuiThemeProvider>
                <div>
                    <Dialog
                        title="Send Route"
                        open={open}
                        actions={actions}
                        onRequestClose={onRequestCompleteClose}>
                        <div>
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
                            <div style={style}>
                                <SelectField
                                    floatingLabelText="Send type"
                                    value={this.state.sendType}
                                    onChange={this.handleSendTypeChange} >
                                    <MenuItem value="send" primaryText="Send" />
                                    <MenuItem value="flash" primaryText="Flash" />
                                    <MenuItem value="onsight" primaryText="On Sight" />
                                </SelectField>
                                <DatePicker
                                    defaultDate={this.state.defaultDate}
                                    maxDate={this.state.defaultDate}
                                    minDate={this.state.minDate}
                                    floatingLabelText="Completion date"
                                    value={this.state.completionDate}
                                    onChange={this.handleDateChange}
                                    disableYearSelection={true}
                                    autoOk={true}
                                />
                                <TextField type="number" onChange={this.handleTriesChange} defaultValue={this.state.numberOfTries} hintText="Number Of Tries" min={1} max={10}></TextField>
                            </div>
                        </div>
                    </Dialog>
                    <Snackbar
                        open={this.state.snackOpen}
                        message={this.state.message}
                        autoHideDuration={4000}
                        onRequestClose={() => this.setState({ snackOpen: false })}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

SendRouteForm.propTypes = {
    baseUrl: PropTypes.string,
    route: PropTypes.object.isRequired,
    onRouteAdded: PropTypes.func.isRequired,
    onRequestCompleteClose: PropTypes.func.isRequired,
    open: PropTypes.bool
}