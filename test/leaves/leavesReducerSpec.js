import {expect} from 'chai';
import reducer from "../../src/leaves/leavesReducer";
import {constants} from "../../src/leaves/leavesActions";

describe("Leaves Reducer", () => {
    it("should return the initial state", () => {
        expect(
            reducer(undefined, {})
        ).deep.equal({ leaves: [], leave: {} });
    });

    it("should return a new state with status LOADING when a LEAVE_FETCHING action is received", () => {
        const action = {type: constants.LEAVE_FETCHING};

        const updatedState = reducer(undefined, action);

        expect(updatedState.status).to.equal("LOADING");
    });

    it("should return a new state with status LOADING when a LEAVE_FETCHED action is received", () => {
        let leave = {dummy: 'dummy'};
        const action = {type: constants.LEAVE_FETCHED, leave: leave};

        const updatedState = reducer(undefined, action);

        expect(updatedState.leave).deep.equal(leave);
    });

    it("should return a new state with status LOADING when a LEAVE_ERROR action is received", () => {
        let error = {error: 'dummy'};
        const action = {type: constants.LEAVE_ERROR, error: error};

        const updatedState = reducer(undefined, action);

        expect(updatedState.error).deep.equal(error);
    });
});