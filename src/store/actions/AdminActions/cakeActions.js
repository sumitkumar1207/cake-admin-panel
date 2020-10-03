/* eslint-disable */
const cakeTypes = require('store/AdminTypes/cakeTypes');
import history from 'store/history';
import CakeService from 'services/CakeService'

export const AddCake = (payload) => async dispatch => {
  try {
    const { data } = await CakeService.AddCake(payload);
    if (data && data.status) {
      dispatch({ type: cakeTypes.ADD_CAKES, payload: { message: data.message, success: true } });
    } else {
      // Handle Error Message Here
      dispatch({ type: "SHOW_SNACKBAR", message: data.message || cakeTypes.COMMON_FAIL_MESSAGE, time: 3000 });
    };
  } catch (error) {
    dispatch({ type: cakeTypes.COMMON_FAIL_MESSAGE, message: "Sorry! Something went wrong. kindly contact your administrator" })
  }
};

export const updateCake = (payload) => async dispatch => {
  // console.log('updateCake payload', payload)
  const { data } = await CakeService.UpdateCake(payload);
  // console.log('updateCake data', data)
  if (data && data.status) {
    await dispatch({ type: "SHOW_SNACKBAR", message: data.message })
    dispatch(getCakeList())
  } else {
    // Handle Error Message Here
    dispatch({ type: "SHOW_SNACKBAR", message: data.message || cakeTypes.COMMON_FAIL_MESSAGE, time: 3000 });
  };
};

export const deleteCake = (payload) => async dispatch => {
  // console.log('deleteCake payload', payload)
  const { data } = await CakeService.DeleteCake(payload);
  // console.log('updateCake data', data)
  if (data && data.status) {
    await dispatch({ type: "SHOW_SNACKBAR", message: data.message })
    dispatch(getCakeList())
  } else {
    // Handle Error Message Here
    dispatch({ type: "SHOW_SNACKBAR", message: data.message || cakeTypes.COMMON_FAIL_MESSAGE, time: 3000 });
  };
};


export const getCakeList = (payload) => async dispatch => {
  const { data } = await CakeService.GetCakes(payload);
  if (data && data.status) {
    dispatch({ type: cakeTypes.GET_CAKES, Records: data.Records || [] });
  } else {
    // Handle Error Message Here
    dispatch({ type: "SHOW_SNACKBAR", message: data.message || cakeTypes.COMMON_FAIL_MESSAGE });
  };
};
