import axios from 'axios';
import { GET_USERS, USERS_ERROR, GET_USERS_ME, USERS_ME_ERROR } from './types';

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

export const getUser = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}`);

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