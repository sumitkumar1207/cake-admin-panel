/* eslint-disable */
const type = require('store/AdminTypes/userTypes');
const initialState = {
    insertMessage: "",
    insertSuccess: false,

    responseMessage: {
        color: "danger",
        message: '',
        status: false,
        place: 'bl'
    },

    userList: [],
    userPages: {
        totalPages: 100,
        currentPage: 1,
        limit: 10,
        search: null,
        sort: 'asc',
    },
    /**
     * USRE ROLES
     */
    userRoleList: [],
    userRolePages: {
        totalPages: 100,
        currentPage: 1,
        limit: 10,
        search: null,
        sort: 'asc',
    },
    /**
     * USRE Profiles
     */
    userProfileList: [],
    userProfilePages: {
        totalPages: 100,
        currentPage: 1,
        limit: 10,
        search: null,
        sort: 'asc',
    },
    /**
     * When admin click on a single user.
     */
    clickedUser: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.GET_USERS:
            return {
                ...state,
                userList: action.Records || []
            };
        case type.ADD_USER:
            return {
                ...state,
                insertSuccess: action.payload.success,
                insertMessage: action.payload.message,
                responseMessage: {
                    place: 'br',
                    color: "info",
                    message: action.payload.message,
                    status: action.payload.success,
                }
            };
        /**
     * Dashboard User
     */
        case type.GET_DASHBOARD_USERS:
            return {
                ...state,
                userDashoardList: action.Records || []
            };

        /**
         * USRE ROLES
         */
        case type.GET_USER_ROLE:
            return {
                ...state,
                userRoleList: action.Records || []
            };
        /**
         * SET USRER Data.
         * Set the user object(to get the user id and email etc).
         */
        case type.SET_USER_OBJECT:
            return {
                ...state,
                clickedUser: action.user_info || {}
            };
        /**
         * USRE PROFILES
         */
        case type.GET_USER_MEDICAL_PROFILES:
            return {
                ...state,
                userProfileList: action.Records || []
            };
        default:
            return state;
    }
}