import React, { Component } from 'react';
import { Panel, Table, Button, Row, FormGroup } from 'react-bootstrap';
const moment = require('moment');

export default class Dashboard extends Component {

    componentWillMount() {
        this.props.fetchLeaves();
    }

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

                <FormGroup>
                    <Row>
                        <Table>
                            <thead>
                                <tr>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Reason</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.props.leaves && this.props.leaves.map((leave, index) => {
                                return <tr key={index}>
                                    <td>{leave.fromDate}</td>
                                    <td>{leave.toDate}</td>
                                    <td>{leave.reason}</td>
                                    <td>{leave.type}</td>
                                </tr>
                            })}
                            </tbody>
                        </Table>
                    </Row>
                </FormGroup>

            </div>
        )
    }
}