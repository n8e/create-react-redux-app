import React from 'react';
import { mount } from 'enzyme';
import About from './index';

describe('About component', () => {
  it('should render self and subcomponents', () => {
    const wrapper = mount(<About />);

    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('h1').text()).toBe('About Page');
    expect(wrapper.contains(<p>Did you get here via Redux?</p>)).toBe(true);
  });
});