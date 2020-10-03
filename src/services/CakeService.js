import Api from './Api';

export default {
  AddCake(payload) {
    return Api().post(`/app/cake/add-cake`, payload);
  },
}
