import { Router, Route, Switch } from 'react-router'
import React from "react";
import LeavesForm from "./leaves/containers/leaveForm";
import Dashboard from "./leaves/containers/dashbord";

export const getRoutes = () => {
    return (
        <div>
            <Route path = "/" component = { Dashboard } />
            <Route path = "/new" component = { LeavesForm } />
        </div>
    )
};