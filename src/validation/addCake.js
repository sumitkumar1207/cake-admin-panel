/* eslint-disable */
import isEmpty from './is-empty.js';
/**
 * 
 * @param {Body of add cake} data.
 * Check for all blank fields, and invalid input from regex.
 */
export const validateAddCakeInput = (data) => {
  let errors = {};

  data.cake_name = !isEmpty(data.cake_name) ? data.cake_name : '';
  data.cake_description = !isEmpty(data.cake_description) ? data.cake_description : '';
  data.cake_price = !isEmpty(data.cake_price) ? data.cake_price : '';
  data.unit_id = !isEmpty(data.unit_id) ? data.unit_id : '';

  if (data.cake_name === '') {
    errors.cake_name = 'Cake name can not be empty'
  }
  if (data.cake_name !== '') {
    const re = /^[a-zA-Z.& ]{4,60}$/
    if (!re.test(data.cake_name)) {
      errors.cake_name = 'Invalid name, Should be minimum 4 characters, and should not contain number and special character!'
    }
  }

  if (data.cake_description === '') {
    errors.cake_description = 'Description can not be empty'
  }
  if (data.cake_description !== '') {
    const re = /^[a-zA-Z0-9\s,.'-]{5,}$/
    if (!re.test(data.cake_description)) {
      errors.cake_description = 'Invalid description, description should be minimum 5 characters'
    }
  }

  if (data.cake_price === '') {
    errors.cake_price = 'Price can not be empty'
  }

  if (data.unit_id === '') {
    errors.unit_id = 'Unit can not be empty'
  }

  return { errors, isValid: isEmpty(errors) };
}

/**
 * 
 * @param {Update body of cake} data 
 */
export const validateEditCakeInput = (data) => {
  let errors = {};
  data.cake_name = !isEmpty(data.cake_name) ? data.cake_name : '';
  data.cake_description = !isEmpty(data.cake_description) ? data.cake_description : '';
  data.cake_price = !isEmpty(data.cake_price) ? data.cake_price : '';
  data.unit_id = !isEmpty(data.unit_id) ? data.unit_id : '';

  if (data.cake_name === '') {
    errors.cake_name = 'Cake name can not be empty'
  }
  if (data.cake_name !== '') {
    const re = /^[a-zA-Z.& ]{4,60}$/
    if (!re.test(data.cake_name)) {
      errors.cake_name = 'Invalid name, Should be minimum 4 characters, and should not contain number and special character!'
    }
  }

  if (data.cake_description === '') {
    errors.cake_description = 'Description can not be empty'
  }
  if (data.cake_description !== '') {
    const re = /^[a-zA-Z0-9\s,.'-]{5,}$/
    if (!re.test(data.cake_description)) {
      errors.cake_description = 'Invalid description, description should be minimum 5 characters'
    }
  }

  if (data.cake_price === '') {
    errors.cake_price = 'Price can not be empty'
  }

  if (data.unit_id === '') {
    errors.unit_id = 'Unit can not be empty'
  }

  return { errors, isValid: isEmpty(errors) };
}