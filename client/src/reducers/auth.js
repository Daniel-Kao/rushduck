import { LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/types";

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

export default function (state = initialState, action) {
  const { type, payload } = action
  console.log(payload)
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null
      }
    default:
      return state
  }
}