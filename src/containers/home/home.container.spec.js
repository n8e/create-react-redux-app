import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedHome from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store = mockStore({
  counter: {
    count: 3
  }
});

describe('Home container', () => {
  const wrapper = mount(<Provider store={store}><ConnectedHome /></Provider>);

  it('should render self and subcomponents', () => {
    expect(wrapper.state()).toEqual(null);
    expect(wrapper.children().length).toEqual(1);
    expect(typeof wrapper.get(0).type).toBe('function');
    expect(wrapper.get(0).props.store.getState().counter.count).toEqual(3);
  });

});