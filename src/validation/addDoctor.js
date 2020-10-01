/* eslint-disable */
import isEmpty from './is-empty.js';

/**
 * 
 * @param {Body of add doctor} data.
 * Check for all blank fields, and invalid input from regex.
 */
export const validateAddDoctorInput = (data) => {
  let errors = {};
  data.doctor_first_name = !isEmpty(data.doctor_first_name) ? data.doctor_first_name : '';
  data.doctor_last_name = !isEmpty(data.doctor_last_name) ? data.doctor_last_name : '';
  data.doctor_email = !isEmpty(data.doctor_email) ? data.doctor_email : '';
  data.doctor_phone = !isEmpty(data.doctor_phone) ? data.doctor_phone : '';
  data.doctor_age = !isEmpty(data.doctor_age) ? data.doctor_age : '';
  data.doctor_gender = !isEmpty(data.doctor_gender) ? data.doctor_gender : '';
  data.doctor_address = !isEmpty(data.doctor_address) ? data.doctor_address : '';
  data.doctor_role = !isEmpty(data.doctor_role) ? data.doctor_role : '';

  if (data.doctor_specialities && data.doctor_specialities.length <= 0) {
    errors.doctor_specialities = 'Select at least one speciality'
  }
  if (data.doctor_email === '') {
    errors.doctor_email = 'Doctor email can not be empty'
  }
  if (data.doctor_email !== '') {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(data.doctor_email)) {
      errors.doctor_email = "Invalid Email address"
    }
  }
  if (data.doctor_first_name === '') {
    errors.doctor_first_name = 'Doctor First name can not be empty'
  }
  if (data.doctor_first_name !== '') {
    const re = /^[a-zA-Z. ]{4,30}$/
    if (!re.test(data.doctor_first_name)) {
      errors.doctor_first_name = 'Invalid first name, Should be minimum 4 characters, and should not contain number and special character!'
    }
  }
  if (data.doctor_last_name === '') {
    errors.doctor_last_name = 'Doctor last name can not be empty'
  }
  if (data.doctor_last_name !== '') {
    const re = /^[a-zA-Z. ]{4,30}$/
    if (!re.test(data.doctor_last_name)) {
      errors.doctor_last_name = 'Invalid last name,Should be minimum 4 characters, and should not contain number and special character!'
    }
  }
  if (data.doctor_phone === '') {
    errors.doctor_phone = 'Doctor phone can not be empty'
  }
  if (data.doctor_age === '') {
    errors.doctor_age = 'Doctor age can not be empty'
  }
  if (data.doctor_age !== '') {
    const re = /^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$/
    if (!re.test(data.doctor_age)) {
      errors.doctor_age = 'Invalid age, age should be between 17 and 120'
    }
  }
  if (data.doctor_gender === '') {
    errors.doctor_gender = 'Doctor gender can not be empty'
  }
  if (data.doctor_gender !== '') {
    let re = /^male$|^Male$|^female$|^Female$|^Other$|^other$/g
    if (!data.doctor_gender.match(re)) {
      errors.doctor_gender = 'Invalid gender, male female and other only allowed.'
    }
  }
  if (data.doctor_address === '') {
    errors.doctor_address = 'Doctor address can not be empty'
  }
  if (data.doctor_role === '') {
    errors.doctor_role = 'Select at least one role'
  }
  return { errors, isValid: isEmpty(errors) };
}

/**
 * 
 * @param {All input data of the edit doctor} data.
 * Check for all field blank, and check with regex.
 */
export const validateUpdateDoctorInput = (data) => {
  let errors = {};
  data.doctor_first_name = !isEmpty(data.doctor_first_name) ? data.doctor_first_name : '';
  data.doctor_last_name = !isEmpty(data.doctor_last_name) ? data.doctor_last_name : '';
  data.doctor_phone = !isEmpty(data.doctor_phone) ? data.doctor_phone : '';
  data.doctor_age = !isEmpty(data.doctor_age) ? data.doctor_age : '';
  data.doctor_gender = !isEmpty(data.doctor_gender) ? data.doctor_gender : '';
  data.doctor_address = !isEmpty(data.doctor_address) ? data.doctor_address : '';

  if (data.doctor_specialities && data.doctor_specialities.length <= 0) {
    errors.doctor_specialities = 'Select at least one speciality'
  }
  if (data.doctor_first_name === '') {
    errors.doctor_first_name = 'Doctor First name can not be empty'
  }
  if (data.doctor_first_name !== '') {
    const re = /^[a-zA-Z. ]{4,30}$/
    if (!re.test(data.doctor_first_name)) {
      errors.doctor_first_name = 'Invalid first name, Should be minimum 4 characters, and should not number and special character!'
    }
  }
  if (data.doctor_last_name === '') {
    errors.doctor_last_name = 'Doctor last name can not be empty'
  }
  if (data.doctor_last_name !== '') {
    const re = /^[a-zA-Z. ]{4,30}$/
    if (!re.test(data.doctor_last_name)) {
      errors.doctor_last_name = 'Invalid last name,Should be minimum 4 characters, and should not number and special character!'
    }
  }
  if (data.doctor_phone === '') {
    errors.doctor_phone = 'Doctor phone can not be empty'
  }
  if (data.doctor_age === '') {
    errors.doctor_age = 'Doctor age can not be empty'
  }
  if (data.doctor_age !== '') {
    const re = /^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$/
    if (!re.test(data.doctor_age)) {
      errors.doctor_age = 'Invalid age, age should be between 17 and 120'
    }
  }
  if (data.doctor_gender === '') {
    errors.doctor_gender = 'Doctor gender can not be empty'
  }
  if (data.doctor_gender !== '') {
    let re = /^male$|^Male$|^female$|^Female$|^Other$|^other$/g
    if (!data.doctor_gender.match(re)) {
      errors.doctor_gender = 'Invalid gender, male female and other only allowed.'
    }
  }
  if (data.doctor_address === '') {
    errors.doctor_address = 'Doctor address can not be empty'
  }
  return { errors, isValid: isEmpty(errors) };
} 
