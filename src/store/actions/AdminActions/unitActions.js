/* eslint-disable */
const unitTypes = require('store/AdminTypes/unitTypes');
import UnitService from 'services/UnitService'

export const AddUnit = (payload) => async dispatch => {
  try {
    const { data } = await UnitService.AddUnit(payload);
    if (data && data.status) {
      dispatch({ type: unitTypes.ADD_UNITS, payload: { message: data.message, success: true } });
    } else {
      // Handle Error Message Here
      dispatch({ type: "SHOW_SNACKBAR", message: data.message || unitTypes.COMMON_FAIL_MESSAGE, time: 3000 });
    };
  } catch (error) {
    dispatch({ type: unitTypes.COMMON_FAIL_MESSAGE, message: "Sorry! Something went wrong. kindly contact your administrator" })
  }
};

export const updateUnit = (payload) => async dispatch => {
  // console.log('updateUnit payload', payload)
  const { data } = await UnitService.UpdateUnit(payload);
  // console.log('updateUnit data', data)
  if (data && data.status) {
    await dispatch({ type: "SHOW_SNACKBAR", message: data.message })
    dispatch(getUnitList())
  } else {
    // Handle Error Message Here
    dispatch({ type: "SHOW_SNACKBAR", message: data.message || unitTypes.COMMON_FAIL_MESSAGE, time: 3000 });
  };
};

export const deleteUnit = (payload) => async dispatch => {
  // console.log('deleteUnit payload', payload)
  const { data } = await UnitService.DeleteUnit(payload);
  // console.log('updateUnit data', data)
  if (data && data.status) {
    await dispatch({ type: "SHOW_SNACKBAR", message: data.message })
    dispatch(getUnitList())
  } else {
    // Handle Error Message Here
    dispatch({ type: "SHOW_SNACKBAR", message: data.message || unitTypes.COMMON_FAIL_MESSAGE, time: 3000 });
  };
};


export const getUnitList = (payload) => async dispatch => {
  const { data } = await UnitService.GetUnits(payload);
  if (data && data.status) {
    dispatch({ type: unitTypes.GET_UNITS, Records: data.Records || [] });
  } else {
    // Handle Error Message Here
    dispatch({ type: "SHOW_SNACKBAR", message: data.message || unitTypes.COMMON_FAIL_MESSAGE });
  };
};
