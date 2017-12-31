import store from '../store';

export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED';
export const INCREMENT = 'counter/INCREMENT';
export const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED';
export const DECREMENT = 'counter/DECREMENT';

export const increment = () => {
  return dispatch => {
    store.dispatch({
      type: INCREMENT_REQUESTED
    })

    store.dispatch({
      type: INCREMENT
    })
  }
}

export const incrementAsync = () => {
  return dispatch => {
    store.dispatch({
      type: INCREMENT_REQUESTED
    })

    return setTimeout(() => {
      store.dispatch({
        type: INCREMENT
      })
    }, 3000)
  }
}

export const decrement = () => {
  return dispatch => {
    store.dispatch({
      type: DECREMENT_REQUESTED
    })

    store.dispatch({
      type: DECREMENT
    })
  }
}

export const decrementAsync = () => {
  return dispatch => {
    store.dispatch({
      type: DECREMENT_REQUESTED
    })

    return setTimeout(() => {
      store.dispatch({
        type: DECREMENT
      })
    }, 3000)
  }
}