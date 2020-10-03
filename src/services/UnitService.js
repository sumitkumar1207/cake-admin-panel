import Api from './Api';

export default {
  AddUnit(payload) {
    return Api().post(`/admin/unit/add-unit`, payload);
  },
  UpdateUnit(payload) {
    return Api().put(`/admin/unit/edit-unit/${payload.unit_id}`, payload)
  },
  DeleteUnit(payload) {
    return Api().delete(`/admin/unit/delete-unit/${payload.unit_id}`, payload)
  },
  GetUnits(payload) {
    let url = `/admin/unit/get-units`;
    if (payload) {
      url += `?limit=${payload['limit']}&currentPage=${payload['currentPage']}`
    };
    return Api().get(`${url}`)
  },
}
