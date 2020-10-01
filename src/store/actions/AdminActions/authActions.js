/* eslint-disable */
const type = require('store/AdminTypes/authTypes');
import history from 'store/history';
import LoginService from 'services/UserService'
import * as Cookies from "js-cookie";

export const setAuthSession = (payload) => async dispatch => {
    Cookies.remove("CKSHSAUTH");
    Cookies.set("CKSHSAUTH", payload.token, { expires: 14 });
    dispatch({
        type: type.SET_AUTH_SESSION,
        payload: {
            token: payload.token,
            isSessionActive: true,
            userInfo: payload.userInfo
        }
    });
};
export const removeAuthSession = (token) => async dispatch => {
    Cookies.remove("CKSHSAUTH");
    dispatch({
        type: type.REMOVE_AUTH_SESSION,
        payload: {
            token: null,
            isSessionActive: false,
        }
    })
};