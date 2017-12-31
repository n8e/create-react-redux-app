import authenticationReducer from './authentication';
import { viewToken, getEmail } from '../utils';

describe('Authentication reducer', () => {

  it('should return the initial state', () => {
    expect(authenticationReducer(undefined, {})).toEqual({
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
    });
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(authenticationReducer([], {
      type: 'LOGIN_REQUEST',
      credentials: {userName: 'some', password: 'password'}
    })).toEqual({
      "credentials": {
        "password": "password",
        "userName": "some"
      },
      "isFetching": true
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(authenticationReducer([], {
      type: 'LOGIN_SUCCESS',
      user: {token: 'token', email: 'some@email.com'}
    })).toEqual({
      "credentials": {
        "confirmPassword": "",
        "email": "some@email.com",
        "password": "",
        "username": ""
      },
      "error": null,
      "isAuthenticated": true,
      "isFetching": false,
      "user": {
        "email": "some@email.com",
        "token": "token"
      }
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    expect(authenticationReducer([], {
      type: 'LOGIN_FAILURE',
      error: {status: 500, message: 'Server Error'}
    })).toEqual({
      "error": {
        "message": "Server Error",
        "status": 500
      },
      "isAuthenticated": false,
      "isFetching": false,
      "user": null
    });
  });

  it('should handle LOGOUT_REQUEST', () => {
    expect(authenticationReducer([], {
      type: 'LOGOUT_REQUEST',
    })).toEqual({"isAuthenticated": false});
  });

  it('should handle CREDENTIALS_UPDATE', () => {
    expect(authenticationReducer([], {
      type: 'CREDENTIALS_UPDATE',
      credentials: {userName: 'some', password: 'password'}
    })).toEqual({"credentials": {"password": "password", "userName": "some"}});
  });

  it('should handle FETCH_USER_DETAILS_SUCCESS', () => {
    expect(authenticationReducer([], {
      type: 'FETCH_USER_DETAILS_SUCCESS',
      user: {userName: 'some', token: 'token', email: 'some@email.com'}
    })).toEqual({"user": {"email": "some@email.com", "token": "token", "userName": "some"}});
  })

  it('should handle USER_DETAILS_UPDATE_SUCCESS', () => {
    expect(authenticationReducer([], {
      type: 'USER_DETAILS_UPDATE_SUCCESS',
      user: {
        _id: 'user_id'
      }
    })).toEqual([]);
  });

});