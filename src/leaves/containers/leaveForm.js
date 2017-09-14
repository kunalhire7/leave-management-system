import {connect} from 'react-redux'

import { leavesActions } from '../leavesActions.js';
import LeavesForm from '../components/leaveForm';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchLeave: () => {
            dispatch(leavesActions.fetchLeave(ownProps.params.leaveId))
        },
        submitLeave: (leave) => {
            dispatch(leavesActions.submitLeave(leave))
        }
    };
};

const mapStateToProps = (state) => {

    return {
        leave: state.leaves.leave
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LeavesForm)
