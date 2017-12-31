import counterReducer from './counter';

describe('Counter reducer', () => {
  it('should return the initial state', () => {
    expect(counterReducer(undefined, {})).toEqual({
      count: 0,
      isIncrementing: false,
      isDecrementing: false
    });
  });
});