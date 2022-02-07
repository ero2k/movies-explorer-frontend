import React from "react";
import { Route, Redirect, } from "react-router-dom";

//
const ProtectedRoute = ({ component: Component, ...props }) => {

    return (
        <Route>
            {() =>
                // authSuccess ? <Component {...props} />  : <Redirect to="/" />
                props.isLoggedIn ? <Component {...props} />  : <Redirect to="/" />
            }
        </Route>
    );
};

export default ProtectedRoute;
