import { viewToken, getEmail } from '../utils';

export const INITIAL_AUTH_STATE = {
  isAuthenticated: !!viewToken(),
  isFetching: false,
  credentials: {
    username: '',
    email: getEmail(),
    password: '',
    confirmPassword: '',
  },
  error: null,
  user: null,
  isShowingLogin: true,
  validations: {
    isValid: false,
  },
};

const authentication = (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'SIGNUP_REQUEST':
      return {
        ...state,
        isFetching: true,
        credentials: action.credentials,
      };

    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
        credentials: {
          username: '',
          email: action.user.email,
          password: '',
          confirmPassword: '',
        },
        error: null,
        user: action.user,
      };

    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
        error: action.error,
        user: null,
      };

    case 'LOGOUT_REQUEST':
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isAuthenticated: false,
      };

    case 'CREDENTIALS_UPDATE':
      return {
        ...state,
        credentials: action.credentials,
      };

    /**
     * Validate input fields entered by the user.
     * In this instance, modify the behaviour of the validator based on the
     * fact that we're validating auth fields.
     */

    case 'FETCH_USER_DETAILS_SUCCESS':
      return {
        ...state,
        user: action.user,
      };

    case 'USER_DETAILS_UPDATE_SUCCESS': {
      const user = state.user;
      if (user && user._id === action.user._id) {
        return state.mergeDeep({
          ...state,
          user: action.user,
        });
      }
      return state;
    }

    default:
      return state;
  }
};


export default authentication;