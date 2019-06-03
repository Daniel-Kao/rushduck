import { GET_USERS, USERS_ERROR, GET_USERS_ME, USERS_ME_ERROR } from '../actions/types';

const initialState = {
  users: [],
  user: null,
  loading: true,
  error: {}
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
    default:
      return state;
  }
}
