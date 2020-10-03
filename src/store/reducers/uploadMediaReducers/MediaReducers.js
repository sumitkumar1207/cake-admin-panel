/* eslint-disable */
const type = require('store/MediaTypes/UploadMediaTypes');

const initialState = {
  insertMessage: "",
  insertSuccess: false,
  uploadSuccess: false,

  responseMessage: {
    color: "danger",
    message: '',
    status: false,
    place: 'br'
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case type.REST_RESPONSE_MESSAGE:
      return {
        ...state,
        responseMessage: {
          ...state.responseMessage,
          message: '',
          status: false,
        }
      };
    case type.UPLOAD_COMMON_IMAGE:
      return {
        ...state,
        uploadSuccess: true,
        responseMessage: {
          place: 'br',
          color: "info",
          message: action.message,
          status: action.status,
        },
        uploadedUrls: action.Records || []
      };
    case "RESET_SUCCESS_FLAG":
      return {
        ...state,
        insertSuccess: false,
      };
    default:
      return state;
  }
}