import {constants} from "./leavesActions";

const initialState = {
    leaves: [],
    leave: {}
};

export default function leaves(state = initialState, action = {}) {
    switch (action.type) {
        case constants.LEAVE_FETCHING:
            return Object.assign({}, state, {
                status: "LOADING"
            });
        case constants.LEAVE_NEW:
            return Object.assign({}, state, {
                leave: action.leave,
                status: "SUCCESS",
                error: null,
                locations: [],
                relatedContent: []
            });
        case constants.LEAVE_SAVED:
        case constants.LEAVE_FETCHED:
            return Object.assign({}, state, {
                leave: action.leave,
                status: "SUCCESS",
                error: null
            });
        case constants.LEAVE_ERROR:
            return Object.assign({}, state, {
                error: action.error,
                status: "ERROR"
            });
        default:
            return state
    }
}
