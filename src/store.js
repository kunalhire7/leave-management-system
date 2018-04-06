import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import {routerMiddleware, routerReducer as routing} from "react-router-redux";
import thunk from "redux-thunk";
import leaves from "./leaves/leavesReducer";

export default function configureStore(initialState, browserHistory) {
    const middleware = routerMiddleware(browserHistory);

    const rootReducer = combineReducers({
        routing,
        leaves
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk, middleware))
    )
}
