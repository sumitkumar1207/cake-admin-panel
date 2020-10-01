/* eslint-disable */

import isEmpty from './is-empty.js';
/**
 * 
 * @param {Body of add User} data.
 * Check for all blank fields, and invalid input from regex.
 */
export const validateAddUserInput = (data) => {
  let errors = {};
  data.user_name = !isEmpty(data.user_name) ? data.user_name : '';
  data.user_email = !isEmpty(data.user_email) ? data.user_email : '';
  data.user_password = !isEmpty(data.user_password) ? data.user_password : '';
  data.role_id = !isEmpty(data.role_id) ? data.role_id : '';
  data.user_mobile = !isEmpty(data.user_mobile) ? data.user_mobile : '';
  data.user_gender = !isEmpty(data.user_gender) ? data.user_gender : '';
  data.user_address = !isEmpty(data.user_address) ? data.user_address : '';

  if (data.user_name === '') {
    errors.user_name = 'User name can not be empty'
  }
  if (data.user_name !== '') {
    const re = /^[a-zA-Z. ]{4,30}$/
    if (!re.test(data.user_name)) {
      errors.user_name = 'Invalid name, Should be minimum 4 characters, and should not contain number and special character!'
    }
  }
  if (data.user_email === '') {
    errors.user_email = 'User email can not be empty'
  }
  if (data.user_email !== '') {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(data.user_email)) {
      errors.user_email = "Invalid Email address"
    }
  }
  if (data.user_password === '') {
    errors.user_password = 'User password can not be empty'
  }
  //password validation
  var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if (data["user_password"] !== "" && !(strongRegex.test(data["user_password"]) || mediumRegex.test(data["user_password"]))) {
    errors.user_password = `Invalid password, Your password should contain:\n-minimum 8 characters\nA number and special characters`
  }
  if (data.role_id === '') {
    errors.role_id = 'Select at least one role'
  }
  if (data.user_mobile === '') {
    errors.user_mobile = 'Mobile field can not be empty'
  }
  if (data.user_gender === '') {
    errors.user_gender = 'Gender can not be empty'
  }
  if (data.user_address === '') {
    errors.user_address = 'Address can not be empty'
  }
  if (data.user_address !== '') {
    const re = /^[a-zA-Z0-9\s,.'-]{5,}$/
    if (!re.test(data.user_address)) {
      errors.user_address = 'Invalid address, address should be minimum 5 characters'
    }
  }
  return { errors, isValid: isEmpty(errors) };
}