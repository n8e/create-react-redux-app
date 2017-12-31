import firebase from 'firebase';
import store from '../store';
import config from '../config';
import { storeCredentials, removeAuthToken } from '../utils';

firebase.initializeApp(config);

export const constructFirebaseUser = firebaseUser => ({
  data: {
    token: firebaseUser.refreshToken,
    email: firebaseUser.email,
  },
});

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: 'RESET_ERROR_MESSAGE',
});

export const validateAuthField = field => ({
  type: 'VALIDATE_AUTH_FIELD',
  field,
});

export const validateUserDetailsField = field => ({
  type: 'VALIDATE_USER_DETAILS_FIELD',
  field,
});

export const validateAnotherUserDetailsField = field => ({
  type: 'VALIDATE_ANOTHER_USER_DETAILS_FIELD',
  field,
});

export const credentialsUpdate = credentials => ({
  type: 'CREDENTIALS_UPDATE',
  credentials,
});

export const loginRequest = credentials => ({
  type: 'LOGIN_REQUEST',
  credentials,
});

export const logoutRequest = () => ({
  type: 'LOGOUT_REQUEST',
});

export const loginSuccess = user => ({
  type: 'LOGIN_SUCCESS',
  user: user.data,
});

export const logoutSuccess = () => ({
  type: 'LOGOUT_SUCCESS',
});

export const loginFailure = error => ({
  type: 'LOGIN_FAILURE',
  error: error.data || { message: error.message },
});

export const logoutFailure = error => ({
  type: 'LOGOUT_FAILURE',
  error: error.data || { message: error.message },
});

export const loginUser = credentials => (dispatch) => {
  // Announce to the application that we're performing login
  store.dispatch(loginRequest(credentials));

  return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
    .then((user) => {
      user = constructFirebaseUser(user);
      storeCredentials({ token: user.data.token, email: user.data.email });
      store.dispatch(loginSuccess(user));
      return user;
    })
    .catch((error) => {
      store.dispatch(loginFailure(error));
    });
};

export const logoutUser = () => (dispatch) => {
  store.dispatch(logoutRequest());

  return firebase.auth().signOut()
    .then(() => {
      removeAuthToken();
      store.dispatch(logoutSuccess());
    })
    .catch((error) => {
      store.dispatch(logoutFailure(error));
    });
};
