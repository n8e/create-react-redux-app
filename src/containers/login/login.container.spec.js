import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedLogin from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store = mockStore({
  auth: {
    user: {
      token: 'token'
    },
    isShowingLogin: true,
    isFetching: false,
    credentials: {},
    validations: {
      isValid: false
    },
  },
});

describe('Login container', () => {
  const wrapper = mount(<Provider store={store}><ConnectedLogin /></Provider>);

  it('should render self and subcomponents', () => {

    expect(wrapper.children().length).toEqual(1);
    expect(typeof wrapper.get(0).type).toBe('function');
    expect(wrapper.get(0).props.children.type.WrappedComponent.defaultProps.auth.isShowingLogin).toEqual(true);
    expect(wrapper.get(0).props.children.type.displayName).toBe('Connect(LoginPageContainer)');
    expect(wrapper.get(0).props.store.getState().auth.isFetching).toEqual(false);
  });

});