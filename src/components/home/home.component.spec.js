import React from 'react';
import { mount } from 'enzyme';
import Home from './index';

const props = {
  count: 1,
  increment: jest.fn(),
  incrementAsync: jest.fn(),
  decrement: jest.fn(),
  decrementAsync: jest.fn(),
  changePage: jest.fn(),
  isIncrementing: false,
  isDecrementing: false,
}

describe('Home component', () => {
  const wrapper = mount(<Home {...props} />);

  it('should render self and subcomponents', () => {
    expect(wrapper.contains(<h1>Home</h1>)).toBe(true);
    expect(wrapper.find('h1').text()).toBe('Home');
    expect(wrapper.find('button').length).toEqual(5);
  });

  it('should call addTodo if length of text is greater than 0', () => {
    const button = wrapper.find('.increment-button');

    expect(button.props().disabled).toEqual(false);
    expect(button.text()).toEqual('Increment');
  })

});