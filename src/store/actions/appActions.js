/* eslint-disable */
const type = require('store/appTypes');
import store from "store/store";
import history from 'store/history';
import LoginService from 'services/UserService'
import * as Cookies from "js-cookie";

export const setSession = (payload) => async dispatch => {
  Cookies.remove("CKSHSID");
  Cookies.remove("CKSAHSINFO")
  Cookies.remove("UNHSRU")
  Cookies.remove("UNHSPRMI")

  Cookies.set("CKSHSID", payload.token, { expires: 14 });
  Cookies.set("CKSAHSINFO", payload.userInfo)
  Cookies.set("UNHSRU", payload.redirectRoute)

  let permission = {
    role: payload.role_name,
    user_id: payload.userInfo.user_email || null
  };
  Cookies.set("UNHSPRMI", permission);

  dispatch({
    type: type.SET_REDIRECT_ROUTE,
    redirectRoute: payload.redirectRoute
  });
  dispatch({
    type: type.SET_SESSION,
    payload: {
      permission,
      token: payload.token,
      isSessionActive: true,
      userInfo: payload.userInfo
    }
  })
};
export const removeSession = (token) => async dispatch => {
  Cookies.remove("CKSHSID");
  Cookies.remove("UNHSPRMI")
  Cookies.remove("CKSAHSINFO");
  dispatch({
    type: type.REMOVE_REDIRECT_ROUTE,
    redirectRoute: null
  });
  dispatch({
    type: type.REMOVE_SESSION,
    payload: {
      token: null,
      isSessionActive: false,
    }
  })
};

export const logOut = (payload) => async dispatch => {
  Cookies.remove("CKSAHSINFO");
  Cookies.remove("CKSHSID");
  Cookies.remove("UNHSPRMI")
  Cookies.remove("CKSHSHSIF");

  // console.log('store', store.getState().AppReducers.redirectRoute)
  // history.push(`/${Cookies.get("UNHSRU")}`);

  dispatch(removeSession())
    .then(() => {
      dispatch({ type: "ADMIN_LOGIN_LOGOUT" })
      dispatch({ type: "HOSPITAL_LOGIN_LOGOUT" })
      // console.log('User Logged Out :', store.getState().AppReducers.redirectRoute);
      console.log('object', `${window.location.origin}/${Cookies.get("UNHSRU")}`)
      // window.location.replace(`${window.location.origin}/${Cookies.get("UNHSRU")}`)
      setTimeout(() => Cookies.remove("UNHSRU"), 500)

    })
}