import axios from 'axios'
import { LOGIN_FAIL, LOGIN_SUCCESS } from "./types";

export const login = (name, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, password })

  try {
    const res = await axios.post('api/admin/login', body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    })
  }
}