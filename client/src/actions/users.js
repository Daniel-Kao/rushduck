import axios from 'axios';
import { GET_USERS, USERS_ERROR, GET_USERS_ME, USERS_ME_ERROR, SET_FORM_DATA } from './types';

export const setFormData = params => ({
  type: SET_FORM_DATA,
  payload: params
})

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users');

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getUser = ({ id, pageNum = 1 }) => async dispatch => {

  const request = {
    params: {
      id, pageNum
    }
  }
  try {
    const res = await axios.get('/api/users/me', request);

    console.log(res)
    dispatch({
      type: GET_USERS_ME,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USERS_ME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};