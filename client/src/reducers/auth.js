import { AUTH, LOGOUT } from "../actions/actionTypes";

const auth = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('bookmark-profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };
    case LOGOUT:
      localStorage.removeItem('bookmark-profile');
      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default auth;