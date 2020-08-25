import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { isAuthenticated } from "./services/auth";
import AdminLayout from "./layouts/layout.component";
import Login from "./views/login/login.component";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const hist = createBrowserHistory();

var ifaces = require("os").networkInterfaces();

// Print the result
console.log(ifaces);

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <PrivateRoute
        path="/admin"
        component={(props) => <AdminLayout {...props} />}
      />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
