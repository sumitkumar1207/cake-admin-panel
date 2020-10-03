import Api from './Api';

export default {
  UploadImage(payload) {
    return Api().post(`/api/upload-image`, payload.formData)
  },
};