const type = require('store/AdminTypes/types');

const initialState = {
    loading: false,
    // connected: false,
    loginError: "",
    role: 'none',
    user: {},
    isLoggedIn: false,
    showForgotPass: false
};
// const appReducer = (state = initialState, action) => {

export default (state = initialState, action) => {
    switch (action.type) {
        case type.ADMIN_LOGIN_LOADING:
            // console.log("Here>>")
            return {
                ...state,
                loading: true,
                loginError: ""
            };
        case type.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: !false,
                user: action.payload.user,
                role: action.payload.role,
                loginError: ""
            };
        case type.ADMIN_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                loginError: action.message,
                // user: {},
                role: 'none',
                showForgotPass: action.inCorrectPass ? true : false
            };
        case type.ADMIN_LOGIN_LOGOUT:
            return {
                loading: false,
                // connected: false,
                loginError: "",
                role: 'none',
                user: {},
                isLoggedIn: false,
                showForgotPass: false
            };
        default:
            return state;
    }
}