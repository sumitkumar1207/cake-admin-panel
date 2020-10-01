/* eslint-disable */
import isEmpty from './is-empty.js';
/**
 * 
 * @param {Body of add Hospital} data.
 * Check for all blank fields, and invalid input from regex.
 */
export const validateAddHospitalInput = (data) => {
  let errors = {};

  data.hospital_speciality_rating = !isEmpty(data.hospital_speciality_rating) ? data.hospital_speciality_rating : '';

  data.hospital_name = !isEmpty(data.hospital_name) ? data.hospital_name : '';

  data.hospital_email = !isEmpty(data.hospital_email) ? data.hospital_email : '';

  data.hospital_password = !isEmpty(data.hospital_password) ? data.hospital_password : '';

  data.hospital_address = !isEmpty(data.hospital_address) ? data.hospital_address : '';

  data.hospital_city_name = !isEmpty(data.hospital_city_name) ? data.hospital_city_name : '';

  data.hospital_state_name = !isEmpty(data.hospital_state_name) ? data.hospital_state_name : '';

  data.hospital_latitude = !isEmpty(data.hospital_latitude) ? data.hospital_latitude : '';

  data.hospital_longitude = !isEmpty(data.hospital_longitude) ? data.hospital_longitude : '';

  data.hospital_recommendation = !isEmpty(data.hospital_recommendation) ? data.hospital_recommendation : '';

  data.selectedFiles = !isEmpty(data.selectedFiles) ? data.selectedFiles : '';

  if (data.hospital_speciality_rating === '') {
    errors.hospital_speciality_rating = 'Hospital ratings can not be empty'
  }
  if (data.hospital_speciality_rating !== '') {
    let ratings = parseInt(data.hospital_speciality_rating)
    if (ratings && ratings <= 0 || ratings > 7) {
      errors.hospital_speciality_rating = 'Hospital ratings should be more than 1 and less than 7'
    }
  }
  if (data.hospital_name === '') {
    errors.hospital_name = 'Hospital name can not be empty'
  }
  if (data.hospital_name !== '') {
    const re = /^[a-zA-Z.& ]{4,60}$/
    if (!re.test(data.hospital_name)) {
      errors.hospital_name = 'Invalid name, Should be minimum 4 characters, and should not contain number and special character!'
    }
  }
  if (data.hospital_email === '') {
    errors.hospital_email = 'Hospital email can not be empty'
  }
  if (data.hospital_email !== '') {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(data.hospital_email)) {
      errors.hospital_email = "Invalid Email address"
    }
  }
  if (data.hospital_password === '') {
    errors.hospital_password = 'Hospital password can not be empty'
  }
  //password validation
  var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if (data["hospital_password"] !== "" && !(strongRegex.test(data["hospital_password"]) || mediumRegex.test(data["hospital_password"]))) {
    errors.hospital_password = `Invalid password, Your password should contain:\n-minimum 8 characters\nA number and special characters`
  }
  if (data.hospital_recommendation === '') {
    errors.hospital_recommendation = 'Select atleast one recommendation'
  }
  if (data.hospital_address === '') {
    errors.hospital_address = 'Address can not be empty'
  }
  if (data.hospital_address !== '') {
    const re = /^[a-zA-Z0-9\s,.'-]{5,}$/
    if (!re.test(data.hospital_address)) {
      errors.hospital_address = 'Invalid address, address should be minimum 5 characters'
    }
  }
  if (data.hospital_city_name === '') {
    errors.hospital_city_name = 'City can not be empty'
  }
  if (data.hospital_state_name === '') {
    errors.hospital_state_name = 'State can not be empty'
  }
  if (data.hospital_latitude === '') {
    errors.hospital_latitude = 'Latitude can not be empty'
  }
  if (data.hospital_latitude !== '') {
    if (!(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/.test(data.hospital_latitude))) {
      errors.hospital_latitude = 'Invalid latitude, please enter correct latitude'
    }
  }
  if (data.hospital_longitude === '') {
    errors.hospital_longitude = 'Longitude can not be empty'
  }
  if (data.hospital_longitude !== '') {
    if (!(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/.test(data.hospital_longitude))) {
      errors.hospital_longitude = 'Invalid longitude, please enter correct longitude'
    }
  }
  if (data.specialities === '') {
    errors.specialities = 'Specialities can not be empty'
  }
  if (data.specialities !== '') {
    if (data.specialities.length <= 0) {
      errors.specialities = 'Select atleast one specialities'
    }
  }

  return { errors, isValid: isEmpty(errors) };
}

/**
 * 
 * @param {Update body of hospital} data 
 */
export const validateEditHospitalInput = (data) => {
  let errors = {};
  data.hospital_name = !isEmpty(data.hospital_name) ? data.hospital_name : '';

  data.hospital_address = !isEmpty(data.hospital_address) ? data.hospital_address : '';

  data.hospital_city_name = !isEmpty(data.hospital_city_name) ? data.hospital_city_name : '';

  data.hospital_state_name = !isEmpty(data.hospital_state_name) ? data.hospital_state_name : '';

  data.hospital_latitude = !isEmpty(data.hospital_latitude) ? data.hospital_latitude : '';

  data.hospital_longitude = !isEmpty(data.hospital_longitude) ? data.hospital_longitude : '';

  data.hospital_recommendation = !isEmpty(data.hospital_recommendation) ? data.hospital_recommendation : '';

  if (data.hospital_name === '') {
    errors.hospital_name = 'Hospital name can not be empty'
  }
  if (data.hospital_name !== '') {
    const re = /^[a-zA-Z.& ]{4,60}$/
    if (!re.test(data.hospital_name)) {
      errors.hospital_name = 'Invalid name, Should be minimum 4 characters, and should not contain number and special character!'
    }
  }

  if (data.hospital_recommendation === '') {
    errors.hospital_recommendation = 'Select atleast one recommendation'
  }
  if (data.hospital_address === '') {
    errors.hospital_address = 'Address can not be empty'
  }
  if (data.hospital_address !== '') {
    const re = /^[a-zA-Z0-9\s,.'-]{5,}$/
    if (!re.test(data.hospital_address)) {
      errors.hospital_address = 'Invalid address, address should be minimum 5 characters'
    }
  }

  if (data.hospital_city_name === '') {
    errors.hospital_city_name = 'City can not be empty'
  }

  if (data.hospital_state_name === '') {
    errors.hospital_state_name = 'State can not be empty'
  }

  if (data.hospital_latitude === '') {
    errors.hospital_latitude = 'Latitude can not be empty'
  }
  if (data.hospital_latitude !== '') {
    if (!(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/.test(data.hospital_latitude))) {
      errors.hospital_latitude = 'Invalid latitude, please enter correct latitude'
    }
  }
  if (data.hospital_longitude === '') {
    errors.hospital_longitude = 'Longitude can not be empty'
  }
  if (data.hospital_longitude !== '') {
    if (!(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/.test(data.hospital_longitude))) {
      errors.hospital_longitude = 'Invalid longitude, please enter correct longitude'
    }
  }

  return { errors, isValid: isEmpty(errors) };
}