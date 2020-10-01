/* eslint-disable */
const type = require('store/AdminTypes/loaderType');

const initialState = {
    isLoading: false,
    isOpenSnackbar: false,
    snackbarTime: 2000,
    snackbarMessage: "",
};

export default (state = initialState, action) => {
    const clearMessage = () => setTimeout(() => state.isOpenSnackbar = false, state.snackbarMessage = "", 500);

    switch (action.type) {
        case type.SHOW_LOADER:
            return {
                ...state,
                isLoading: true
            };
        case type.HIDE_LOADER:
            return {
                ...state,
                isLoading: false
            };
        case type.SHOW_SNACKBAR:
            clearMessage();
            return {
                ...state,
                isOpenSnackbar: true,
                snackbarTime: action['time'] || 1400,
                snackbarMessage: action.message
            };
        case type.HIDE_SNACKBAR:
            return {
                ...state,
                isOpenSnackbar: false,
                snackbarMessage: ""
            }
        default:
            return state;
    };
};
