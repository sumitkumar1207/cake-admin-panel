/* eslint-disable */
const type = require('store/AdminTypes/loaderType');

const show = () => dispatch => {
    dispatch({ type: "SHOW_LOADER" })
};

const hide = () => dispatch => {
    dispatch({ type: "HIDE_LOADER" })
};

export {
    show,
    hide
}