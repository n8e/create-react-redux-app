import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.setTimeout(100000);

const store = mockStore({
  counter: {
    count: 0,
    isIncrementing: false,
    isDecrementing: false
  },
  authentication: {
    isAuthenticated: false,
    isFetching: false,
    credentials: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    error: null,
    user: null,
    isShowingLogin: true,
    validations: {
      isValid: false,
    },
  }
});

xdescribe('App container', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[ '/' ]}>
        <App/>
      </MemoryRouter>
    </Provider>
  );

  xit('should render self and subcomponents', (done) => {

    expect(wrapper.children().length).toEqual(1);
  });

});