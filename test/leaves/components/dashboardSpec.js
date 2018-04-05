import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import sinon from "sinon";
import Dashboard from "../../../src/leaves/components/dashboard";
import {Button} from "react-bootstrap";

describe("Dashboard", () => {
    let wrapper, navigateToNewLeaveStub = sinon.spy();

    beforeEach(() => {
        wrapper = shallow(<Dashboard navigateToNewLeave={navigateToNewLeaveStub}/>);
    });

    describe("Render", () => {
        it("should render NewLeave button", () => {
            let newLeaveBtn = wrapper.find('Button');
            expect(newLeaveBtn.type()).equal(Button);
            expect(newLeaveBtn.prop('children')).equal('New Leave');
        });
    });

    describe('Event Handlers', () => {
        it('should navigate to new leave page when clicked on New Leave button', () => {
            let newLeaveBtn = wrapper.find('Button');
            newLeaveBtn.simulate('click', {preventDefault: () => {}});
            expect(navigateToNewLeaveStub.called).equal(true);
        });
    });
});