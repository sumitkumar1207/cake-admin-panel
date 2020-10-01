import Axios from "axios";
import CryptoJS from "crypto-js";
import _ from "lodash";

var secretKey = "HereIsTheMySecretKey_LOL";

export const authenticationService = {
  login,
  logout,
  set,
  get
};
function set(key, value) {
  if (key && value) {
    let setEncryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
    window.localStorage.setItem(key, setEncryptedData);
  } else {
    console.error('key value is undefined');
  }
}

function get(key) {
  let getEncryptedData = window.localStorage.getItem(key);
  if (!_.isNull(getEncryptedData))
    return JSON.parse(CryptoJS.AES.decrypt(getEncryptedData, secretKey).toString(CryptoJS.enc.Utf8))
  return null;
}

function login(username, password) {

  console.log('usernamesssssssss', username)
  // Call API
  // return Axios;
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("USINFO");
  currentUserSubject.next(null);
}
