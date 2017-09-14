import { Router, Route, Switch } from 'react-router'
import React from "react";
import LeavesForm from "./leaves/containers/leaveForm";

export const getRoutes = () => {
    return (
        <Switch>
            <Route path = "/" component = { LeavesForm } />
        </Switch>
    )
};