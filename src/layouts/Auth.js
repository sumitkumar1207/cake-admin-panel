/* eslint-disable */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar";
import Footer from "components/Footer/Footer";

import routes from "routes";

import styles from "assets/jss/layouts/authStyle";

import register from "assets/img/register.svg";
import login from "assets/img/login.svg";
import lock from "assets/img/lock.svg";
import error from "assets/img/clint-mckoy.svg";
import pricing from "assets/img/bg-pricing.svg";
import LoginPage from "viewPages/LoginPage";

// const useStyles = makeStyles(styles);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router'
import PropTypes from "prop-types";
class AuthPages extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        // if (props.isSessionActive) {
        //     this.props.history.push("/admin/dashboard");
        // }
    }
    componentDidMount() {
        this._isMounted = true;
        document.body.style.overflow = "unset";
    };
    componentWillUnmount() {
        this._isMounted = false;
    }


    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.collapse) {
                return this.getRoutes(prop.views);
            }
            if (prop.layout === "/auth") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    getBgImage = () => {
        if (window.location.pathname.indexOf("/admin/register-page") !== -1) {
            return register;
        } else if (window.location.pathname.indexOf("/admin/login") !== -1) {
            return login;
        } else if (window.location.pathname.indexOf("/admin/pricing-page") !== -1) {
            return pricing;
        } else if (
            window.location.pathname.indexOf("/admin/lock-screen-page") !== -1
        ) {
            return lock;
        } else if (window.location.pathname.indexOf("/admin/error-page") !== -1) {
            return error;
        }
    };
    getActiveRoute = routes => {
        let activeRoute = "Default Brand Text";
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].collapse) {
                let collapseActiveRoute = this.getActiveRoute(routes[i].views);
                if (collapseActiveRoute !== activeRoute) {
                    return collapseActiveRoute;
                }
            } else {
                if (
                    window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
                ) {
                    return routes[i].name;
                }
            }
        }
        return activeRoute;
    };

    render() {
        const { classes, ...rest } = this.props;
        return (
            <React.Fragment>
                {this.props.isSessionActive ? "" :
                    <div>
                        {/* <AuthNavbar brandText={getActiveRoute(routes)} {...rest} /> */}
                        <div className={classes.wrapper} ref={this.refs.mainPanel}>
                            <div
                                className={classes.fullPage}
                                style={{ backgroundImage: "url(" + this.getBgImage() + ")" }}
                            >
                                <Switch>
                                    {<Route
                                        path={"/admin" + "/login"}
                                        component={LoginPage}
                                        key={0}
                                    />}
                                    <Redirect from="/admin" to="/admin/login" />
                                    <Footer white />
                                </Switch>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
};
const mapStateToProps = state => ({
    token: state.AppReducers.token,
    isSessionActive: state.AppReducers.isSessionActive,

});
// const _AuthPages = withStyles(styles)(AuthPages)
// export default function Pages(props) {
//     const isMounted = React.useRef(false);
//     const session = React.useContext(SessionContext);
//     if (session['UNHSID']) {
//         props.history.push("/admin/dashboard");
//     }
//     React.useEffect(() => {
//         isMounted.current = true;
//         return () => (isMounted.current = false);
//     }, []);

//     return (
//         isMounted ? <_AuthPages /> : ""
//     )
// }

export default connect(mapStateToProps)(withStyles(styles)(AuthPages))