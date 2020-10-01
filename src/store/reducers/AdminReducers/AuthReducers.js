
/* eslint-disable */

const type = require('store/AdminTypes/authTypes');
import * as Cookies from "js-cookie";

const initialState = {
    auth: [],
};
// const appReducer = (state = initialState, action) => {

export default (state = initialState, action) => {
    switch (action.type) {
        case type.SET_AUTH_SESSION:
            // console.log("Here>>")
            return {
                ...state,
            };
        case type.REMOVE_AUTH_SESSION:
            return {
                auth: [],
            };
        default:
            return state;
    }
};