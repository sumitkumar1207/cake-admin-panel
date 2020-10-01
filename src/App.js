/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import { Provider, ReactReduxContext } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import ReactPixel from "react-facebook-pixel";
import store from "store/store";
import history from "store/history";
import AuthLayout from "layouts/Auth";
import AdminLayout from "layouts/Admin";
import { AbilityContext } from "plugins/permissions/Can";
import ability from "plugins/permissions/ability";
import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";
import Loading from "viewPages/Loading";
import Snackbar from "viewPages/Snackbar";
import "assets/scss/custom-loader-scss.scss";
import "app.css";

import { compose, lifecycle, withHandlers, withState } from "recompose";

const renderNotification = (notification, i) => <li key={i}>{notification}</li>;

const hist = createBrowserHistory();

ReactPixel.init("111649226022273");
ReactPixel.pageView();
ReactPixel.fbq("track", "PageView");

hist.listen((location) => {
  ReactPixel.pageView();
  ReactPixel.fbq("track", "PageView");
});

const App = ({ token, notifications }) => (

  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AbilityContext.Provider value={ability}>

        {<Snackbar />}
        {<Loading />}

        <Switch>
          <Route path="/admin" component={AdminLayout} />
          <Redirect from="/" to={`admin/login`} />
        </Switch>
      </AbilityContext.Provider>
    </ConnectedRouter>
  </Provider>

);

export default compose(
  withState("token", "setToken", ""),
  withState("notifications", "setNotifications", []),
  withHandlers({
    pushNotification: ({ setNotifications, notifications }) => (
      newNotification
    ) => setNotifications(notifications.concat(newNotification)),
  }),
  lifecycle({
  })
)(App);
