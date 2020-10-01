/* eslint-disable */
const type = require('store/appTypes');
import * as Cookies from "js-cookie";

const initialState = {
    redirectRoute: Cookies.get("UNHSRU") ? Cookies.get("UNHSRU") : "/hospital",
    token: Cookies.get("CKSHSID") ? Cookies.get("CKSHSID") : null,
    isSessionActive: Cookies.get("CKSHSID") ? true : false,
    userInfo: Cookies.get("CKSAHSINFO") ? JSON.parse(Cookies.get("CKSAHSINFO")) : undefined,
    permission: Cookies.get("UNHSPRMI") ? JSON.parse(Cookies.get("UNHSPRMI")) : {
        role: "",
        user_id: null,
    }
};
// const appReducer = (state = initialState, action) => {

export default (state = initialState, action) => {
    switch (action.type) {
        case type.SET_REDIRECT_ROUTE:
            return {
                ...state,
                redirectRoute: action.redirectRoute
            };
        case type.REMOVE_REDIRECT_ROUTE:
            return {
                ...state,
                redirectRoute: null
            };
        case type.SET_SESSION:
            // console.log("Here>>")
            return {
                ...state,
                token: action.payload.token,
                isSessionActive: action.payload.isSessionActive,
                userInfo: action.payload.userInfo,
                permission: action.payload.permission
            };
        case type.REMOVE_SESSION:
            return {
                ...state,
                token: action.payload.token,
                isSessionActive: false,
                userInfo: undefined,
                permission: {
                    role: "",
                    user_id: null,
                }
            };
        default:
            return state;
    }
}