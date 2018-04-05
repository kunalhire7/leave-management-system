import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import FieldGroup from '../../common/fieldGroup';

export default class LeaveForm extends Component {

    constructor() {
        super();
        this.state = {};
    }

    onFromDateChanged(e) {
        this.setState({fromDate: new Date(e.target.value)});
    }

    onToDateChanged(e) {
        this.setState({toDate: new Date(e.target.value)});
    }

    onReasonChanged(e) {
        this.setState({reason: e.target.value});
    }

    onTypeChanges(e) {
        this.setState({type: e.target.value});
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.props.submitLeave(this.state);
    }

    render() {
        return (
            <div className="container">
                <h2>Leave Management System</h2>
                <form>
                    <FieldGroup
                        id="fromDate"
                        type="date"
                        label="From"
                        onChange={(e) => this.onFromDateChanged(e)}
                    />
                    <FieldGroup
                        id="toDate"
                        type="date"
                        label="To"
                        onChange={(e) => this.onToDateChanged(e)}
                    />
                    <FieldGroup
                        id="reason"
                        label="Reason"
                        type="text"
                        onChange={(e) => this.onReasonChanged(e)}
                    />

                    <FormGroup controlId="leaveType">
                        <ControlLabel>Leave Type</ControlLabel>
                        <FormControl componentClass="select" placeholder="select" onChange={(e) => this.onTypeChanges(e)}>
                            <option value="PAID_LEAVES">Paid Leaves</option>
                            <option value="LOP">Leave Without Pay</option>
                            <option value="COMPENSATION_OFF">Compensation Off</option>
                        </FormControl>
                    </FormGroup>

                    <Button id="submitBtn" bsStyle="primary" type="submit" onClick={(e) => this.onFormSubmit(e)}>
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}