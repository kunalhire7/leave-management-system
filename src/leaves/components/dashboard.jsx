import React, { Component } from 'react';
import { Panel, Table, Button } from 'react-bootstrap';

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
                return <tr>
                            <td>{index + 1}</td>
                            <td>{row.fromDate}</td>
                            <td>{row.toDate}</td>
                            <td>{row.toDate - row.fromDate}</td>
                            <td>{row.reason}</td>
                            <td>{row.type}</td>
                            <td>Pending Approval</td>
                        </tr>
            }, this)
        }

        return (
            <div className="container">
                <Button allign="right" bsStyle="info" onClick={(e) => this.newLeave(e)}>New Leave</Button>
                <Panel header="My Leaves">
                    <Table>
                        {this.getTableHeaders()}
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Panel>
            </div>
        )
    }
}