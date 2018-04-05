import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import sinon from "sinon";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import configureStore from "redux-mock-store";

import LeaveForm from "../../../src/leaves/containers/leaveForm";

describe("Leave Form Container", () => {
    let wrapper;

    const mockStore = configureStore([thunk]);
    const store = mockStore({leaves: {}});

    beforeEach(() => {
        wrapper = shallow(
            <Provider store = {store} >
                <LeaveForm params = {{leaveId: 1234}}/>
            </Provider>
        );
    });

    it("should dispatch an action to fetch a leave", () => {
        let shallowWrapper = wrapper.dive({context: {store}});
        shallowWrapper.prop('fetchLeave')();

        let executedAction = store.getActions()[0];

        expect(executedAction.type).equal('LEAVE_FETCHING');
        expect(executedAction.leaveId).equal(1234);
    });

    /*it("should dispatch an action to submit a leave", () => {
        let leave = {
            fromDate: new Date(),
            toDate: new Date(),
            reason: 'vacation'
        };
        let shallowWrapper = wrapper.dive({context: {store}});
        shallowWrapper.prop('submitLeave')(leave);

        console.log(store.getActions());
        let executedAction = store.getActions()[0];

        expect(executedAction.type).equal('LEAVE_FETCHING');
        expect(executedAction.leaveId).equal(1234);
    });*/
});