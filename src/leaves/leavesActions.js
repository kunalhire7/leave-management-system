import http, {
    config,
    APPLICATION_JSON
} from "../api/http";

const leaveFetching = (leaveId) => ({
    type: constants.LEAVE_FETCHING,
    leaveId
});

const leaveFetched = (leave) => ({
    type: constants.LEAVE_FETCHED,
    leave
});

const leaveError = (error) => ({
    type: constants.LEAVE_ERROR,
    error
});

const fetchLeave = (leaveId) => {
    return (dispatch) => {
        dispatch(leaveFetching(leaveId));
        return http.get(dispatch, `${config.serverUrl}/leaves/${leaveId}`, null, {
            'Accept': APPLICATION_JSON
        }).then((resp) => {
            dispatch(leaveFetched(resp));
            return resp
        }).catch((err) => {
            dispatch(leaveError(`Unable to retrieve the leave with id ${leaveId}: ${err.status} (${err.statusText})`))
        })
    }
};

const leaveSubmitted = (resp) => ({
    type: constants.LEAVE_FETCHED,
    resp
});

const submitLeave = (leave) => {
    return (dispatch) => {
        return http.post(dispatch, `${config.serverUrl}/leaves/`, leave, {
            'Accept': APPLICATION_JSON
        }).then((resp) => {
            dispatch(leaveSubmitted(resp));
            return resp
        }).catch((err) => {
            dispatch(leaveError(`Unable to submit the leave: ${err.status} (${err.statusText})`))
        })
    }
};

export const constants = {
    LEAVE_ERROR: "LEAVE_ERROR",
    LEAVE_NEW: "LEAVE_NEW",
    LEAVE_SAVING: "LEAVE_SAVING",
    LEAVE_SAVED: "LEAVE_SAVED",
    LEAVE_FETCHING: "LEAVE_FETCHING",
    LEAVE_FETCHED: "LEAVE_FETCHED"
};

export const leavesActions = {
    fetchLeave,
    submitLeave
};