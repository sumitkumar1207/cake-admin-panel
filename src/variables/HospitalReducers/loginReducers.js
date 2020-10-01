
const type = require('store/HospitalTypes/loginTypes');

const initialState = {
    loading: false,
    // connected: false,
    loginError: "",
    role: 'none',
    user: {},
    isLoggedIn: false
};
// const appReducer = (state = initialState, action) => {

export default (state = initialState, action) => {
    switch (action.type) {
        case type.LOGIN_LOADING:
            // console.log("Here>>")
            return {
                ...state,
                loading: true,
                loginError: ""
            };
        case type.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: !state.isLoggedIn,
                user: action.payload.user,
                role: action.payload.role,
                loginError: ""
            };
        case type.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                loginError: action.message,
                // user: {},
                role: 'none'
            };
        case type.LOGIN_LOGOUT:
            return state;
        default:
            return state;
    }
}