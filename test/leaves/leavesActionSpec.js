import { expect } from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {config} from "../../src/api/http";
import {leavesActions, constants} from "../../src/leaves/leavesActions";

describe("Leaves Action", () => {
    let mockStore, api, store;
    let leaveFormStub = {
        fromDate: '2018-04-05',
        toDate: '2018-04-08',
        reason: 'vacation'
    };

    before(() => {
        mockStore = configureMockStore([thunk]);
        api = nock(config.serverUrl);
    });

    beforeEach(() => {
        store = mockStore({});
    });

    afterEach(() => {
        store.clearActions();
        nock.cleanAll()
    });

    it("should dispatch correct action when fetchLeave is called", (done) => {
        const request = api.get(`/leaves/1234`).reply(200, leaveFormStub);

        store.dispatch(leavesActions.fetchLeave(1234))
            .then((resp) => {
                request.done();
                let executedActions = store.getActions();
                expect(executedActions[0].type).to.equal(constants.LEAVE_FETCHING);
                expect(executedActions[1].type).to.equal(constants.LEAVE_FETCHED);
                expect(executedActions[1].leave).to.deep.equal(leaveFormStub);
                done();
            })
            .catch(done);
    });

    it("should dispatch correct action when fetchLeave is called and returned error", (done) => {
        let error = {error: 'error'};
        const request = api.get(`/leaves/1234`).reply(500, error);

        store.dispatch(leavesActions.fetchLeave(1234))
            .then((resp) => {
                request.done();
                let executedActions = store.getActions();
                expect(executedActions[0].type).to.equal(constants.LEAVE_FETCHING);
                expect(executedActions[1].type).to.equal(constants.LEAVE_ERROR);
                expect(executedActions[1].error).to.deep.equal('Unable to retrieve the leave with id 1234: 500 (Internal Server Error)');
                done();
            })
            .catch(done);
    });

    it("should dispatch correct action when submitLeave is called", (done) => {
        const request = api.post(`/leaves/`).reply(201, leaveFormStub);

        store.dispatch(leavesActions.submitLeave(leaveFormStub))
            .then((resp) => {
                request.done();
                let executedActions = store.getActions();
                expect(executedActions[0].type).to.equal(constants.LEAVE_FETCHED);
                expect(executedActions[0].resp).to.deep.equal(leaveFormStub);
                expect(executedActions[1].type).to.equal('@@router/CALL_HISTORY_METHOD');
                expect(executedActions[1].payload).to.deep.equal({ method: 'push', args: [ '/' ] });
                done();
            })
            .catch(done);
    });

    it("should dispatch correct action when submitLeave is called and returned error", (done) => {
        let error = {error: 'error'};
        const request = api.post(`/leaves/`).reply(500, error);

        store.dispatch(leavesActions.submitLeave(leaveFormStub))
            .then((resp) => {
                request.done();
                let executedActions = store.getActions();
                expect(executedActions[0].type).to.equal(constants.LEAVE_ERROR);
                expect(executedActions[0].error).to.deep.equal('Unable to submit the leave: 500 (Internal Server Error)');
                done();
            })
            .catch(done);
    });

    it('should dispatch an action to fetch the leaves', (done) => {
        const request = api.get(`/leaves`).reply(200, [leaveFormStub]);

        store.dispatch(leavesActions.fetchLeaves())
            .then((resp) => {
                request.done();
                let executedActions = store.getActions();
                expect(executedActions[0].type).to.equal(constants.LEAVE_FETCHING);
                expect(executedActions[1].type).to.equal(constants.LEAVES_FETCHED);
                expect(executedActions[1].leaves).to.deep.equal([leaveFormStub]);
                done();
            })
            .catch(done);
    });

    it('should dispatch an action to fetch the leaves when it returns the error', (done) => {
        const request = api.get(`/leaves`).reply(500, {error: 'error'});

        store.dispatch(leavesActions.fetchLeaves())
            .then((resp) => {
                request.done();
                let executedActions = store.getActions();
                expect(executedActions[0].type).to.equal(constants.LEAVE_FETCHING);
                expect(executedActions[1].type).to.equal(constants.LEAVE_ERROR);
                expect(executedActions[1].error).to.deep.equal('error occurred');
                done();
            })
            .catch(done);
    });
});