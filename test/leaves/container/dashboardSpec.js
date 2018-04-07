import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import configureStore from "redux-mock-store";
import Dashboard from "../../../src/leaves/containers/dashbord";

describe("Dashboard Container", () => {
    let wrapper;

    const mockStore = configureStore([thunk]);
    const store = mockStore({leaves: {}});

    beforeEach(() => {
        wrapper = shallow(
            <Provider store = {store} >
                <Dashboard/>
            </Provider>
        );
    });

    it("should dispatch an action to navigate To New Leave", () => {
        let shallowWrapper = wrapper.dive({context: {store}});
        shallowWrapper.prop('navigateToNewLeave')();

        let executedAction = store.getActions()[0];

        expect(executedAction.type).equal('@@router/CALL_HISTORY_METHOD');
        expect(executedAction.payload).deep.equal({ method: 'push', args: [ 'new' ] });
    });

    it('should pass leaves to connected component', () => {
        const leaves = [{dummy: 'dummy'}];
        const store = mockStore({leaves: {leaves: leaves}});
        let shallowWrapper = wrapper.dive({context: {store}});
        expect(shallowWrapper.prop('leaves')).deep.equal(leaves);
    });

    it('should dispatch an action to fetch leaves', () => {
        const store = mockStore({leaves: {}});
        let shallowWrapper = wrapper.dive({context: {store}});
        shallowWrapper.prop('fetchLeaves')();
        expect(store.getActions()[0].type).deep.equal('LEAVE_FETCHING');
    });
});