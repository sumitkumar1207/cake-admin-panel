/* eslint-disable */
const type = require('store/AdminTypes/cakeTypes');
const initialState = {
  insertMessage: "",
  insertSuccess: false,

  responseMessage: {
    color: "danger",
    message: '',
    status: false,
    place: 'bl'
  },

  cakeList: [],
  cakePages: {
    totalPages: 100,
    currentPage: 1,
    limit: 10,
    search: null,
    sort: 'asc',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case type.ADD_CAKES:
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
    case type.GET_CAKES:
      return {
        ...state,
        cakeList: action.Records,
      };
    case "RESET_SUCCESS_FLAG":
      return {
        ...state,
        insertSuccess: false,
      };
    case "REST_RESPONSE_MESSAGE":
      return {
        ...state,
        responseMessage: {
          place: 'br',
          color: "info",
          message: '',
          status: false,
        }
      };
    default:
      return state;
  }
}