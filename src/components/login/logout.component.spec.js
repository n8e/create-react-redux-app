import React from 'react';
import { mount } from 'enzyme';
import Logout from './logout';

describe('Logout component', () => {
  it('should render self and subcomponents', () => {
    const wrapper = mount(<Logout />);

    expect(wrapper.contains(<noscript />)).toBe(true);
  });
});