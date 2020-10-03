/* eslint-disable */
const UploadMediaTypes = require('store/MediaTypes/UploadMediaTypes');
import MediaService from 'services/MediaServices';

const uploadImage = (payload) => async dispatch => {
  const { data } = await MediaService.UploadImage({ ...payload });
  if (data && data.status) {
    dispatch({ status: data.status, type: UploadMediaTypes.UPLOAD_COMMON_IMAGE, Records: data.Records, message: data.message });
  } else {
    // Handle Error Message Here
    dispatch({ type: "SHOW_SNACKBAR", message: data.message || UploadMediaTypes.COMMON_FAIL_MESSAGE, time: 3000 });
  };
  setTimeout(() => dispatch({ type: "HIDE_LOADER" }), 1000);
};

export {
  uploadImage
};