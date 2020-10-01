
/* eslint-disable */
import React from "react";
import { connect } from 'react-redux';
import store from 'store/store';
import Snackbar from "components/Snackbar/Snackbar";

function _Snackbar(props) {
    const [bl, setBL] = React.useState(false);
    React.useEffect(() => {
        setBL(props.isOpenSnackbar);
        const timer = setTimeout(() => props.isOpenSnackbar ? props.dispatch({ type: "HIDE_SNACKBAR" }) : undefined, props.snackbarTime || 2000
        );
        // return props.isOpenSnackbar ? () => clearTimeout(timer) : null;
    });

    return (
        bl ? <Snackbar
            place="br"
            color="info"
            message={props.snackbarMessage}
            open={bl}
            closeNotification={() => props.dispatch({ type: "HIDE_SNACKBAR" })}
            close
        /> : ""
    )
};
_Snackbar.defaultProps = {
    snackbarMessage: "Saif",
    isOpenSnackbar: false,
    snackbarTime: 2000,
};
// export default _Snackbar

export default connect(state => ({
    isOpenSnackbar: state.AdminLoaderReducers.isOpenSnackbar,
    snackbarMessage: state.AdminLoaderReducers.snackbarMessage,
    snackbarTime: state.AdminLoaderReducers.snackbarTime
}))(_Snackbar)
