import {createStore, applyMiddleware, combineReducers} from "redux";
import {routerMiddleware, routerReducer as routing} from "react-router-redux";
import thunk from "redux-thunk";
import leaves from "./leaves/leavesReducer";

export default function configureStore(initialState, browserHistory) {
    const middleware = routerMiddleware(browserHistory);

    const rootReducer = combineReducers({
        routing,
        leaves
    });

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, middleware)
    )
}
