import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import {getRoutes} from "./routes";
import configureStore from "./store";

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

render(
    <Provider store = { store }>
        <ConnectedRouter history={history}>
            {getRoutes()}
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);