import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import sinon from "sinon";
import LeaveForm from "../../../src/leaves/components/leaveForm";
import FieldGroup from "../../../src/common/fieldGroup";
import {Button} from "react-bootstrap";

describe("Leave Form Component", () => {
    let wrapper, fetchLeaveStub = sinon.spy(), submitLeaveStub = sinon.spy();

    beforeEach(() => {
        wrapper = shallow(<LeaveForm fetchLeave={fetchLeaveStub} submitLeave={submitLeaveStub} leaves={[]}/>);
    });

    describe("Render", () => {
        it("should have the correct form name", () => {
            let title = wrapper.find('h2');
            expect(title.text()).equal("Leave Management System");
        });

        it("should render fromDate", () => {
            let fromDate = wrapper.find('#fromDate');
            expect(fromDate.type()).equal(FieldGroup);
            expect(fromDate.prop('type')).equal('date');
            expect(fromDate.prop('label')).equal('From');
        });

        it("should render toDate", () => {
            let toDate = wrapper.find('#toDate');
            expect(toDate.type()).equal(FieldGroup);
            expect(toDate.prop('type')).equal('date');
            expect(toDate.prop('label')).equal('To');
        });

        it("should render reason", () => {
            let reason = wrapper.find('#reason');
            expect(reason.type()).equal(FieldGroup);
            expect(reason.prop('type')).equal('text');
            expect(reason.prop('label')).equal('Reason');
        });

        it("should render leaveType", () => {
            let leaveType = wrapper.find('FormGroup');
            expect(leaveType.find('ControlLabel').prop('children')).equal('Leave Type');

            let options = leaveType.find('FormControl');
            expect(options.childAt(0).prop('children')).equal('Paid Leaves');
            expect(options.childAt(1).prop('children')).equal('Leave Without Pay');
            expect(options.childAt(2).prop('children')).equal('Compensation Off');
        });

        it("should render Submit Button", () => {
            let submitBtn = wrapper.find('#submitBtn');
            expect(submitBtn.type()).equal(Button);
            expect(submitBtn.prop('children')).equal('Submit');
        });
    });

    describe('Event Handlers', () => {
        it('should update fromDate when it is changed', () => {
            let fromDate = wrapper.find('#fromDate');
            fromDate.simulate('change', {target: {value: '2018-04-01'}});
            expect(wrapper.state().fromDate.toString()).equal('Sun Apr 01 2018 02:00:00 GMT+0200 (CEST)');
        });

        it('should update toDate when it is changed', () => {
            let toDate = wrapper.find('#toDate');
            toDate.simulate('change', {target: {value: '2018-04-03'}});
            expect(wrapper.state().toDate.toString()).equal('Tue Apr 03 2018 02:00:00 GMT+0200 (CEST)');
        });

        it('should update reason when it is changed', () => {
            let reason = wrapper.find('#reason');
            reason.simulate('change', {target: {value: 'Vacations'}});
            expect(wrapper.state().reason.toString()).equal('Vacations');
        });

        it('should update leave type when it is changed', () => {
            let leaveType = wrapper.find('FormControl');
            leaveType.simulate('change', {target: {value: 'LOP'}});
            expect(wrapper.state().type.toString()).equal('LOP');
        });

        it('should submit leave when clicked on Submit', () => {
            let submitBtn = wrapper.find('#submitBtn');
            submitBtn.simulate('click', {preventDefault: () => {}});
            expect(submitLeaveStub.called).equal(true);
        });
    });
});