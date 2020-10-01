import Api from './Api';

export default {
    InsertUser(payload) {
        return Api().post(`/admin/user/add/admin`, payload);
    },
    LoginUser(payload) {
        return Api().post(`/app/user/login`, payload);
    },
    GetUsers(payload) {
        let url = `/admin/user/all`;
        if (payload) {
            url += `?limit=${payload['limit']}&currentPage=${payload['currentPage']}`
        };
        return Api().get(url);
    },
    GetDashboardUsers(payload) {
        let url = `/admin/user/get/admins`;
        if (payload) {
            url += `?limit=${payload['limit']}&currentPage=${payload['currentPage']}`
        };
        return Api().get(url);
    },
    GetUserRoles(payload) {
        // let url = `/admin/role/all`;
        let url = `/admin/role/get/user-roles`;
        if (payload) {
            url += `?limit=${payload['limit']}&currentPage=${payload['currentPage']}`
        };
        return Api().get(url);
    },
    /**
     * 
     * @param {user object} payload.
     * Get the user medical profiles. 
     */
    getUserMedicalProfiles(payload) {
        //@route    GET 4004/app/medicalprofile/user/:user_id
        let url = `/app/medicalprofile/user/${payload.user_id}`;
        if (payload) {
            url += `?limit=${payload['limit']}&currentPage=${payload['currentPage']}`
        };
        return Api().get(url);
    },
    /**
     * HOSPITAL ADMIN PANEL
     */
    LoginHospitalUser(payload) {
        return Api().post(`/app/hospital/login`, payload);
    },
    /**
     * SEND EMAIL TO HOSPITAL EMAIL(For forgot password)
     */
    SendLinkToHospitalEmail(payload) {
        return Api().post(`/api/forgot-hospital-pass`, payload);
    },
    /**
     * SEND EMAIL TO USER EMAIL(For get the link of forgot password)
     */
    SendLinkToUserEmail(payload) {
        return Api().post(`/api/forgot-pass`, payload);
    },
}
