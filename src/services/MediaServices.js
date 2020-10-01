import Api from './Api';

export default {
  UploadDoctorProfile(payload) {
    return Api().post(`/api/upload-image`, payload.formData)
  },
  UploadImage(payload) {
    return Api().post(`/api/upload-image`, payload.formData)
  },
  UploadAudio(payload) {
    return Api().post(`/api/upload-audio`, payload.formData)
  },
};