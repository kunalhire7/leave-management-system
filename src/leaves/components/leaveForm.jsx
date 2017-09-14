import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import FieldGroup from '../../common/fieldGroup';

export default class LeaveForm extends Component {

    constructor() {
        super();
        this.leave = {};
    }

    onFromDateChanged(e) {
        console.log("From Date::", new Date(e.target.value));
        this.leave.fromDate = new Date(e.target.value);
    }

    onToDateChanged(e) {
        console.log("To Date::", new Date(e.target.value));
        this.leave.toDate = new Date(e.target.value);
    }

    onReasonChanged(e) {
        console.log("Reason::", e.target.value);
        this.leave.reason = e.target.value;
    }

    onTypeChanges(e) {
        console.log("Type::", e.target.value);
        this.leave.type = e.target.value;
    }

    onFormSubmit(e) {
        e.preventDefault();
        console.log("Form submitted::", this.leave);
        this.props.submitLeave(this.leave);
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

                    <Button bsStyle="primary" type="submit" onClick={(e) => this.onFormSubmit(e)}>
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}