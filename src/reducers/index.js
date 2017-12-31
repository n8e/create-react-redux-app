import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authentication from './authentication';
import counter from './counter';

export default combineReducers({
  router: routerReducer,
  authentication,
  counter
});