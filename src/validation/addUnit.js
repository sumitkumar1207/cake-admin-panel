/* eslint-disable */
import isEmpty from './is-empty.js';
/**
 * 
 * @param {Body of add unit} data.
 * Check for all blank fields, and invalid input from regex.
 */
export const validateAddUnitInput = (data) => {
  let errors = {};
  data.unit_name = !isEmpty(data.unit_name) ? data.unit_name : '';
  data.unit_value = !isEmpty(data.unit_value) ? data.unit_value : '';

  if (data.unit_name === '') {
    errors.unit_name = 'Unit name can not be empty'
  }
  if (data.unit_name !== '') {
    const re = /^[a-zA-Z.& ]{2,60}$/
    if (!re.test(data.unit_name)) {
      errors.unit_name = 'Invalid name, Should be minimum 2 characters, and should not contain number and special character!'
    }
  }
  if (data.unit_value === '') {
    errors.unit_value = 'Value can not be empty'
  }

  return { errors, isValid: isEmpty(errors) };
}

/**
 * 
 * @param {Update body of unit} data 
 */
export const validateEditUnitInput = (data) => {
  let errors = {};
  data.unit_name = !isEmpty(data.unit_name) ? data.unit_name : '';
  data.unit_value = !isEmpty(data.unit_value) ? data.unit_value : '';

  if (data.unit_name === '') {
    errors.unit_name = 'Unit name can not be empty'
  }
  if (data.unit_name !== '') {
    const re = /^[a-zA-Z.& ]{2,60}$/
    if (!re.test(data.unit_name)) {
      errors.unit_name = 'Invalid name, Should be minimum 2 characters, and should not contain number and special character!'
    }
  }
  if (data.unit_value === '') {
    errors.unit_value = 'Value can not be empty'
  }

  return { errors, isValid: isEmpty(errors) };
}