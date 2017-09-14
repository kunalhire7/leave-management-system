import {connect} from 'react-redux'

import { leavesActions } from '../leavesActions.js';
import Dashboard from '../components/dashboard';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchLeaves: () => {
            dispatch(leavesActions.fetchLeaves())
        },
        navigateToNewLeave: () => {
            dispatch(leavesActions.navigateToNewLeave())
        }
    };
};

const mapStateToProps = (state) => {

    return {
        leaves: state.leaves.leaves
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
