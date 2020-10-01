/* eslint-disable */

import axios from 'axios';
import { BASEURL } from "config/index";
import * as Cookies from "js-cookie";

export default () => {
  const instance = axios.create({
    baseURL: BASEURL
  })
  let token = Cookies.get("CKSHSID");
  if (token && String(token).length > 0) {
    instance.defaults.headers.common['Authorization'] = token// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IlUyRnNkR1ZrWDE4YlFQM2w4UHVlcEFLTHVEcUVvanVIaW5NdHhXOGR1YXFpaFlmbGFSU3l3YU1GZkYvSS9Ycy9LTVRucVo3UzVwRFBDYlFZYVRTcW83NGJYR1hTTmdKS3ZSaXJyVzA2NU9aQTFXeTcyaDJkQndBNys5dlU4a2l0OEtoQ3dhcEpndXhWYnFlQ1oyQmszMDNwK0VGTUVFSTd4S21HcVV1TlFFOD0iLCJpYXQiOjE1ODU5MDQxNjIsImV4cCI6MTU4ODQ5NjE2Mn0.Y0C-NXMuCTAIwowTKNIbg81T3vPHQWVxL5_RDywRZdw"
  }
  // instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    console.log('reject error', typeof error)
    // console.log('reject error', JSON.parse(error))
    console.log('reject error', error === "Network Error")
    console.error('reject error', error)
    // Do something with response error
    if (error && error.response && error.response.status && error.response.status == 403) {
      window.location.replace("/access-denied")
    } else if (error && error.response && error.response.status && error.response.status == 401) {
      localStorage.clear();
      Cookies.remove("CKSAHSINFO");
      Cookies.remove("CKSHSID");
      window.location.replace("/")
    } else {
      return Promise.reject(error);
    }
  });
  return instance;
}
