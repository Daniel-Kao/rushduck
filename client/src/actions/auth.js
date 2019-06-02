import axios from 'axios';
import { LOGIN_FAIL, LOGIN_SUCCESS, ADMIN_LOADED, AUTH_ERROR } from './types';
import setAuthToken from '../utils/setAuthToken';
import { message } from 'antd';

export const loadAdmin = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/admin/auth');

    dispatch({
      type: ADMIN_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const login = (name, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, password });

  try {
    const res = await axios.post('api/admin/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadAdmin());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => message.error(error.msg));
    }
    console.log(errors);
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
