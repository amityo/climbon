import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import { ListItem } from 'material-ui/List';
import { AppBar } from 'material-ui/AppBar';
import { List, makeSelectable } from 'material-ui/List';
import PropTypes from 'prop-types';
import {withRouter } from 'react-router-dom';

const SelectableList = makeSelectable(List);

class AppNavDrawer extends React.Component {
    handleChangeList = (event, value) => {
        const {
            history,
            onChangeList
        } = this.props;

        history.push(value);
        onChangeList();
    }

    render() {
        const {
            open,
            onRequestChangeNavDrawer,
            location
        } = this.props;

        return (
            <MuiThemeProvider>
                <div>
                    <Drawer
                        docked={false}
                        open={open}
                        onRequestChange={onRequestChangeNavDrawer}
                    >
                        <SelectableList
                            value={location.pathname}
                            onChange={this.handleChangeList}
                        >
                            <ListItem primaryText="Home" value="/" />
                            <ListItem primaryText="Login" value="/login" />
                            <ListItem primaryText="Register" value="/register" />
                        </SelectableList>
                    </Drawer>
                </div>
            </MuiThemeProvider>
        );
    }
}
AppNavDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestChangeNavDrawer: PropTypes.func.isRequired,
    onChangeList: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export const AppNavDrawerWithRouter = withRouter(AppNavDrawer);

