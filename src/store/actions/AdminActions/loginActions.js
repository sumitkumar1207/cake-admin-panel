/* eslint-disable */
const type = require('store/AdminTypes/types');
import history from 'store/history';
import LoginService from 'services/UserService'
import * as Cookies from "js-cookie";
import { setSession, removeSession } from "store/actions/appActions";

export const login = (payload) => async dispatch => {
  try {
    const { data } = await LoginService.LoginUser(payload);
    if (data && data.status && data.Records && data.Records.length > 0) {
      dispatch({
        type: type.ADMIN_LOGIN_SUCCESS,
        payload: { user: { name: 'saif', pass: '1324' }, role: 'admin' }
      });
      // : 
      let role_name = data.Records[0]['role_name'] ? data.Records[0]['role_name'].replace(/\s/g, '') : ''; // === "super admin" ? 

      dispatch(setSession({ token: data.Records[0].token, userInfo: data.Records[0], role_name, redirectRoute: '/admin' }));
      history.push('/admin/dashboard');
    } else {
      dispatch({ type: type.ADMIN_LOGIN_FAILURE, message: data.message || "Please re-confirm the credential", inCorrectPass: true })
    };
  } catch (error) {
    // console.error('error :', error);
    dispatch({ type: type.ADMIN_LOGIN_FAILURE, message: "Sorry! Something went wrong. kindly contact your administrator" })
  }
};

export const sendLinkToUserEmail = (payload) => async dispatch => {
  try {
    const { data } = await LoginService.SendLinkToUserEmail(payload);
    if (data && data.status) {
      // dispatch({ status: data.status, type: type.SEND_RESSET_LINK_TO_HOSPITAL_EMAIL, Records: data.Records, message: data.message });
      dispatch({ type: "SHOW_SNACKBAR", message: data.message || HospitalDoctorsTypes.COMMON_FAIL_MESSAGE, time: 3000 });
    } else {
      // Handle Error Message Here
      dispatch({ type: "SHOW_SNACKBAR", message: data.message || HospitalDoctorsTypes.COMMON_FAIL_MESSAGE, time: 3000 });
    };
  } catch (error) {
    dispatch({ type: type.ADMIN_LOGIN_FAILURE, message: "Sorry! Something went wrong. kindly contact your administrator" })
  }
}