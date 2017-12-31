import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
jest.mock('./__mocks__/firebase.js');
import {
  constructFirebaseUser,
  resetErrorMessage,
  validateAuthField,
  validateUserDetailsField,
  validateAnotherUserDetailsField,
  credentialsUpdate,
  loginRequest,
  logoutRequest,
  loginSuccess,
  logoutSuccess,
  loginFailure,
  logoutFailure,
  loginUser,
  logoutUser
} from './authentication';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

let store = mockStore({
  isAuthenticated: false,
  isFetching: false,
  credentials: {
    username: '',
    email: 'some@email.com',
    password: '',
    confirmPassword: '',
  },
  error: null,
  user: null,
  isShowingLogin: true,
  validations: {
    isValid: false,
  },
});

describe('Authentication actions', () => {
  it('should dispatch a reset error action', () => {
    const expectedAction = dispatch => store.dispatch({
      type: 'RESET_ERROR_MESSAGE'
    });
    expect(typeof resetErrorMessage).toBe('function');
    expect(resetErrorMessage()).toEqual(expectedAction());
  });

  it('should dispatch a validate auth field action', () => {
    const expectedAction = dispatch => store.dispatch({
      type: 'VALIDATE_AUTH_FIELD'
    });
    expect(typeof validateAuthField).toBe('function');
    expect(validateAuthField()).toEqual(expectedAction());
  });

  it('should dispatch a validate user details field action', () => {
    const expectedAction = dispatch => store.dispatch({
      type: 'VALIDATE_USER_DETAILS_FIELD'
    });
    expect(typeof validateUserDetailsField).toBe('function');
    expect(validateUserDetailsField()).toEqual(expectedAction());
  });

  it('should dispatch a validate another user details field action', () => {
    const expectedAction = dispatch => store.dispatch({
      type: 'VALIDATE_ANOTHER_USER_DETAILS_FIELD'
    });
    expect(typeof validateAnotherUserDetailsField).toBe('function');
    expect(validateAnotherUserDetailsField()).toEqual(expectedAction());
  });

  it('should dispatch a credentials update action', () => {
    const expectedAction = dispatch => store.dispatch({
      type: 'CREDENTIALS_UPDATE',
      credentials: {userName: 'some', password: 'password'}
    });
    expect(typeof credentialsUpdate).toBe('function');
    expect(credentialsUpdate({userName: 'some', password: 'password'})).toEqual(expectedAction());
  });

  it('should dispatch a login request action', () => {
    const expectedAction = dispatch => store.dispatch({
      type: 'LOGIN_REQUEST',
      credentials: {userName: 'some', password: 'password'}
    });
    expect(typeof loginRequest).toBe('function');
    expect(loginRequest({userName: 'some', password: 'password'})).toEqual(expectedAction());
  });

  it('should dispatch a logout request action', () => {
    const expectedAction = dispatch => store.dispatch({
      type: 'LOGOUT_REQUEST'
    });
    expect(typeof logoutRequest).toBe('function');
    expect(logoutRequest()).toEqual(expectedAction());
  });

  it('should dispatch a login success action', () => {
    const expectedAction = dispatch => store.dispatch({
      type: 'LOGIN_SUCCESS',
      user: {token: 'token', email: 'some@email.com'}
    });
    expect(typeof loginSuccess).toBe('function');
    expect(loginSuccess({data: {token: 'token', email: 'some@email.com'}})).toEqual(expectedAction());
  });

  it('should dispatch a logout success action', () => {
    const expectedAction = dispatch => store.dispatch({
      type: 'LOGOUT_SUCCESS'
    });
    expect(typeof logoutSuccess).toBe('function');
    expect(logoutSuccess()).toEqual(expectedAction());
  });

  it('should dispatch a login failure action', () => {
    const expectedAction = dispatch => store.dispatch({
      type: 'LOGIN_FAILURE',
      error: {status: 500, message: 'Server Error'}
    });
    expect(typeof loginFailure).toBe('function');
    expect(loginFailure({data: {status: 500, message: 'Server Error'}})).toEqual(expectedAction());
  });

  it('should dispatch a logout failure action', () => {
    const expectedAction = dispatch => store.dispatch({
      type: 'LOGOUT_FAILURE',
      error: {status: 500, message: 'Server Error'}
    });
    expect(typeof logoutFailure).toBe('function');
    expect(logoutFailure({data: {status: 500, message: 'Server Error'}})).toEqual(expectedAction());
  });
});


describe('Authentication action creators', () => {

  let loginPromise = {};

  it('should dispatch a login user action', () => {
    expect(typeof loginUser).toBe('function');
    loginPromise = loginUser({email: 'test@user.com', password: 'password'})();
    expect(typeof loginPromise).toEqual('object');
  });

  it('should dispatch a logout user action', () => {
    expect(typeof logoutUser).toBe('function');
    loginPromise = logoutUser()();
    expect(typeof loginPromise).toEqual('object');
  });

});