import { GET_USERS, USERS_ERROR, GET_USERS_ME, USERS_ME_ERROR, SET_FORM_DATA } from '../actions/types';

const initialState = {
  users: [],
  user: null,
  loading: true,
  error: {},
  record: {
    name: '',
    expense: '',
    topup: ''
  }
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      }
    case GET_USERS_ME:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case USERS_ERROR:
    case USERS_ME_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case SET_FORM_DATA:
      return {
        ...state,
        record: payload
      }
    default:
      return state;
  }
}
