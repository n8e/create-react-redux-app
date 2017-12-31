import React from 'react';
import { mount } from 'enzyme';
import Login from './index';

const props = {
  errors: {
    email: 'some@email.com',
    password: 'password'
  },
  auth: {
    credentials: {
      email: 'some@email.com',
      password: 'password'
    }
  },
  onValidateField: jest.fn(),
  onAuthAction: jest.fn(),
  onFieldUpdate: jest.fn(),
}

describe('Login component', () => {
  it('should render self and subcomponents', () => {
    const wrapper = mount(<Login {...props} />);

    expect(wrapper.contains(<div className="title-header">Login</div>)).toBe(true);
    expect(wrapper.contains(<label htmlFor="login">Email:</label>)).toBe(true);
    expect(wrapper.contains(<label htmlFor="password">Password:</label>)).toBe(true);
    expect(wrapper.contains(<button className="action-button" onClick={props.onAuthAction} disabled={props.errors.email || props.errors.password}>Login</button>)).toBe(true);
  });
});