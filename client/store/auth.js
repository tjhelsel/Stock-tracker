import axios from 'axios';
import history from '../history';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
const LOGOUT = 'LOGOUT';

const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user
});

const loginFailure = () => ({
  type: LOGIN_FAILURE
});

const logoutSuccess = () => ({
  type: LOGOUT
});

export const logOut = () => {
  return async dispatch => {
    try {
      await axios.post('/logout');
      dispatch(logoutSuccess());
    } catch (error) {
      console.error(error);
    }
  };
};

export const me = () => async dispatch => {
  try {
    const { data } = await axios.get('/auth/me');
    if (data) {
      await axios.get('');
    }
    dispatch(loginSuccess(data));
  } catch (err) {
    console.error(err);
  }
};

export const logIn = (email, password) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      dispatch(loginSuccess(data));
      history.push('/portfolio');
    } catch (error) {
      dispatch(loginFailure());
      history.push('/login');
      console.error(error);
    }
  };
};

const signupSuccess = () => ({
  type: SIGNUP_FAILURE
});

const signupFailure = () => ({
  type: SIGNUP_FAILURE
});

export const createUser = user => {
  return async dispatch => {
    try {
      await axios.post('/auth/signup', user);
      dispatch(signupSuccess());
      history.push('/login');
    } catch (error) {
      dispatch(signupFailure());
      console.error(error);
    }
  };
};

const initialState = { user: null, loginFailed: false, signupFailed: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.user, loginFailed: false };
    case LOGIN_FAILURE:
      return { ...state, loginFailed: true };
    case SIGNUP_SUCCESS:
      return { ...state, signupFailed: false };
    case SIGNUP_FAILURE:
      return { ...state, signupFailed: true };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default reducer;
