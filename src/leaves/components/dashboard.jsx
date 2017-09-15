import React, { Component } from 'react';
import { Panel, Table, Button, Row, FormGroup } from 'react-bootstrap';
const moment = require('moment');

export default class Dashboard extends Component {

    componentDidMount() {
        this.props.fetchLeaves();
    }

    getTableHeaders() {
        return (
            <thead>
                <tr>
                    <th>#</th>
                    <th>From</th>
                    <th>To</th>
                    <th>No Of Days</th>
                    <th>Reason</th>
                    <th>Type</th>
                    <th>Status</th>
                </tr>
            </thead>
        );
    }

    newLeave(e) {
        e.preventDefault();
        this.props.navigateToNewLeave();
    }

    render() {
        let rows;

        if(this.props.leaves) {
            rows = this.props.leaves.map((row, index) => {
                let fromDate = moment(row.fromDate);
                let toDate = moment(row.toDate);
                return <tr>
                            <td>{index + 1}</td>
                            <td>{fromDate.format("Do MMM YY")}</td>
                            <td>{toDate.format("Do MMM YY")}</td>
                            <td>{toDate.diff(fromDate, "days") + 1}</td>
                            <td>{row.reason}</td>
                            <td>{row.type}</td>
                            <td>Pending Approval</td>
                        </tr>
            }, this)
        }

        return (
            <div className="container">
                <FormGroup>
                    <Row>
                        <Button bsStyle="info" className="pull-right" onClick={(e) => this.newLeave(e)}>New Leave</Button>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Panel header="My Leaves">
                            <Table>
                                {this.getTableHeaders()}
                                <tbody>
                                    {rows}
                                </tbody>
                            </Table>
                        </Panel>
                    </Row>
                </FormGroup>
            </div>
        )
    }
}