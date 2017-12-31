import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  INCREMENT,
  INCREMENT_REQUESTED,
  DECREMENT,
  DECREMENT_REQUESTED,
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from './counter';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

let store = mockStore({
  count: 0,
  isIncrementing: false,
  isDecrementing: false
});

describe('Counter actions', () => {
  beforeEach(() => {
    store = mockStore({
      count: 0,
      isIncrementing: false,
      isDecrementing: false
    });
  });

  afterEach(() => {
    store = mockStore({
      count: 0,
      isIncrementing: false,
      isDecrementing: false
    });
  });

  it('should create an action to increment counter', () => {
    const expectedIncrementAction = dispatch => {
      store.dispatch({
        type: INCREMENT_REQUESTED
      });
  
      store.dispatch({
        type: INCREMENT
      });
    };
    expect(typeof increment).toBe('function');
    expect(increment()()).toEqual(expectedIncrementAction());
  });

  it('should create an action to incrementAsync counter', () => {
    const expectedIncrementAsyncAction = dispatch => {
      store.dispatch({
        type: INCREMENT_REQUESTED
      });
  
      return setTimeout(() => {
        store.dispatch({
          type: INCREMENT
        });
      }, 3000);
    };
    expect(typeof incrementAsync).toBe('function');
    expect(incrementAsync()()+1).toEqual(expectedIncrementAsyncAction());
  });

  it('should create an action to decrement counter', () => {
    const expectedDecrementAction = dispatch => {
      store.dispatch({
        type: DECREMENT_REQUESTED
      });
  
      store.dispatch({
        type: DECREMENT
      });
    };
    expect(typeof decrement).toBe('function');
    expect(decrement()()).toEqual(expectedDecrementAction());
  });

  it('should create an action to decrementAsync counter', () => {
    const expectedDecrementAsyncAction = dispatch => {
      store.dispatch({
        type: DECREMENT_REQUESTED
      });
  
      return setTimeout(() => {
        store.dispatch({
          type: DECREMENT
        });
      }, 3000);
    };
    expect(typeof decrementAsync).toBe('function');
    expect(decrementAsync()()+1).toEqual(expectedDecrementAsyncAction());
  });
});