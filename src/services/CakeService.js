import Api from './Api';

export default {
  AddCake(payload) {
    return Api().post(`/app/cake/add-cake`, payload);
  },
  UpdateCake(payload) {
    return Api().put(`/app/cake/edit-cake/${payload.cake_id}`, payload)
  },
  DeleteCake(payload) {
    return Api().delete(`/app/cake/delete-cake/${payload.cake_id}`, payload)
  },
  GetCakes(payload) {
    let url = `/app/cake/get-cakes`;
    if (payload) {
      url += `?limit=${payload['limit']}&currentPage=${payload['currentPage']}`
    };
    return Api().get(`${url}`)
  },
}
