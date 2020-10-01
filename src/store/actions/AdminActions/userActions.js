/* eslint-disable */
import history from 'store/history';
import store from 'store/store';
const type = require('store/AdminTypes/userTypes');
// import loaderAction from 'store/history';
import UserService from 'services/UserService';

const insertUser = (payload) => async (dispatch) => {
    const { data } = await UserService.InsertUser(payload);
    if (data && data.status) {
        // dispatch({ type: type.ADD_USER, Records: data.Records, message: data.message });
        dispatch({ type: "SHOW_SNACKBAR", message: data.message, time: 4000 });
        dispatch({ type: type.ADD_USER, payload: { message: data.message, success: data.status } });
    } else {
        dispatch({ type: "SHOW_SNACKBAR", message: data.message, time: 4000 });
        // Handle Error Message Here
    };
};

const getUsers = () => (dispatch) => {
    dispatch({ type: "SHOW_LOADER" })
    store.dispatch(getUsersList())
};
const getUsersList = () => async (dispatch) => {
    dispatch({ type: "SHOW_LOADER" })

    const { data } = await UserService.GetUsers();

    if (data && data.status) {
        dispatch({ type: type.GET_USERS, Records: data.Records });
    } else {
        dispatch({ type: "SHOW_SNACKBAR", message: data.message, time: 4000 });
        // Handle Error Message Here
    };
    setTimeout(() => dispatch({ type: "HIDE_LOADER" }), 1000);
};

/**
 * Dashboard users List
 */
const GetDashboardUsersList = () => async (dispatch) => {
    dispatch({ type: "SHOW_LOADER" })

    const { data } = await UserService.GetDashboardUsers();

    if (data && data.status) {
        dispatch({ type: type.GET_DASHBOARD_USERS, Records: data.Records });
    } else {
        dispatch({ type: "SHOW_SNACKBAR", message: data.message, time: 4000 });
        // Handle Error Message Here
    };
    setTimeout(() => dispatch({ type: "HIDE_LOADER" }), 1000);
};

/**
 * USRE ROLES
 * GET
 */
const getUserRoles = (payload) => async dispatch => {
    const { data } = await UserService.GetUserRoles(payload);
    if (data && data.status) {
        dispatch({ type: type.GET_USER_ROLE, Records: data.Records || [] });
    } else {
        // Handle Error Message Here
        dispatch({ type: "SHOW_SNACKBAR", message: data.message || type.COMMON_FAIL_MESSAGE });
    };
};
/**
 * Set the user object
 * SET
 */
const setUserObject = (payload) => async dispatch => {
    dispatch({ type: "SHOW_LOADER" })
    dispatch({ type: type.SET_USER_OBJECT, user_info: payload });
    setTimeout(() => dispatch({ type: "HIDE_LOADER" }), 1000);
};

/**
 * Users Medical Profile
 * GET
 */
const getUserMedicalProfiles = (payload) => async dispatch => {
    // let clickedUser = store.getState().AdminUserReducers.clickedUser
    dispatch({ type: "SHOW_LOADER" })
    const { data } = await UserService.getUserMedicalProfiles(payload);
    if (data && data.status) {
        dispatch({ type: type.GET_USER_MEDICAL_PROFILES, Records: data.Records });
    } else {
        // Handle Error Message Here
        dispatch({ type: "SHOW_SNACKBAR", message: data.message || type.COMMON_FAIL_MESSAGE });
    };
    setTimeout(() => dispatch({ type: "HIDE_LOADER" }), 1000);
};

export {
    insertUser,
    getUsers,
    GetDashboardUsersList,
    getUserRoles,
    getUserMedicalProfiles,
    setUserObject
}