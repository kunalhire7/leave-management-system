import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import sinon from "sinon";
import Dashboard from "../../../src/leaves/components/dashboard";
import {Button} from "react-bootstrap";

describe("Dashboard", () => {
    let wrapper, navigateToNewLeaveStub = sinon.spy(), fetchLeavesStub = sinon.spy(),
        leaves = [
        {
            fromDate: '2018-04-06',
            toDate: '2018-04-08',
            reason: 'Not feeling well',
            type: 'LOP'
        },
        {
            fromDate: '2018-05-06',
            toDate: '2018-05-08',
            reason: 'vacations',
            type: 'Paid Leaves'
        }
    ];

    beforeEach(() => {
        wrapper = shallow(<Dashboard navigateToNewLeave={navigateToNewLeaveStub} fetchLeaves={fetchLeavesStub} leaves={leaves}/>);
    });

    describe("Render", () => {
        it("should render NewLeave button", () => {
            let newLeaveBtn = wrapper.find('Button');
            expect(newLeaveBtn.type()).equal(Button);
            expect(newLeaveBtn.prop('children')).equal('New Leave');
        });

        describe('Table', () => {
            it('should render the table headers', () => {
                const tableHeaders = wrapper.find('thead tr');

                expect(tableHeaders.childAt(0).text()).equal('From Date');
                expect(tableHeaders.childAt(1).text()).equal('To Date');
                expect(tableHeaders.childAt(2).text()).equal('Reason');
                expect(tableHeaders.childAt(3).text()).equal('Type');
            });

            it('should redenr the correct data in table', () => {
                const tableRows = wrapper.find('tbody tr');
                expect(tableRows.at(0).childAt(0).text()).equal('2018-04-06');
                expect(tableRows.at(0).childAt(1).text()).equal('2018-04-08');
                expect(tableRows.at(0).childAt(2).text()).equal('Not feeling well');
                expect(tableRows.at(0).childAt(3).text()).equal('LOP');

                expect(tableRows.at(1).childAt(0).text()).equal('2018-05-06');
                expect(tableRows.at(1).childAt(1).text()).equal('2018-05-08');
                expect(tableRows.at(1).childAt(2).text()).equal('vacations');
                expect(tableRows.at(1).childAt(3).text()).equal('Paid Leaves');
            });
        });

    });

    describe('Event Handlers', () => {
        it('should navigate to new leave page when clicked on New Leave button', () => {
            let newLeaveBtn = wrapper.find('Button');
            newLeaveBtn.simulate('click', {preventDefault: () => {}});
            expect(navigateToNewLeaveStub.called).equal(true);
        });

        it('should make an action to fetch leaves when component is loaded', () => {
            expect(fetchLeavesStub.called).equal(true);
        });
    });
});