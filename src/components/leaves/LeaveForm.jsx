import React, { Component } from 'react';

export default class LeaveForm extends Component {

    constructor() {
        super();
        this.leave = {};
    }

    onFromDateChanged(e) {
        console.log("From Date::", e.target.value);
        this.leave.fromDate = e.target.value;
    }

    onToDateChanged(e) {
        console.log("To Date::", e.target.value);
        this.leave.toDate = e.target.value;
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
    }

    render() {
        return (
            <div>
                <form>
                    <label>From : </label>
                    <input id="fromDate" type="date" onChange={(e) => this.onFromDateChanged(e)} /><br/>
                    <label>To : </label>
                    <input id="toDate" type="date" onChange={(e) => this.onToDateChanged(e)}/><br/>
                    <label>Leave Type : </label>
                    <select id="leaveType" onChange={(e) => this.onTypeChanges(e)}>
                        <option value="paidLeaves">Paid Leaves</option>
                        <option value="lop">Leave Without Pay</option>
                        <option value="compensationOff">Compensation Off</option>
                    </select><br/>
                    <label>Reason : </label>
                    <input id="reason" type="text" onChange={(e) => this.onReasonChanged(e)} /><br/>
                    <input id="submit" type="submit" onClick={(e) => this.onFormSubmit(e)}/>
                </form>
            </div>
        );
    }
}