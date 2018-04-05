import React, { Component } from 'react';
import { Panel, Table, Button, Row, FormGroup } from 'react-bootstrap';
const moment = require('moment');

export default class Dashboard extends Component {
    newLeave(e) {
        e.preventDefault();
        this.props.navigateToNewLeave();
    }

    render() {
        return (
            <div className="container">
                <FormGroup>
                    <Row>
                        <Button bsStyle="info" className="pull-right" onClick={(e) => this.newLeave(e)}>New Leave</Button>
                    </Row>
                </FormGroup>
            </div>
        )
    }
}