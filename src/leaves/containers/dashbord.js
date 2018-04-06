import {connect} from 'react-redux'

import { leavesActions } from '../leavesActions.js';
import Dashboard from '../components/dashboard';

const mapDispatchToProps = (dispatch) => {
    return {
        navigateToNewLeave: () => {
            dispatch(leavesActions.navigateToNewLeave())
        }
    };
};

const mapStateToProps = (state) => {

    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
