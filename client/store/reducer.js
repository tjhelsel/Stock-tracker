import axios from 'axios';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user
});

export const logIn = (email, password) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      dispatch(loginSuccess(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = { user: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default reducer;
