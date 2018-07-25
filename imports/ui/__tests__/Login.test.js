import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Login } from '../Login';

describe('Login', function () {

  it('should show error messages', function () {
    const error = 'This is not working';
    const wrapper = shallow(<Login loginWithPassword={() => { }} />);

    wrapper.setState({ error });
    expect(wrapper.find('p').text()).toBe(error);

    wrapper.setState({ error: '' });
    expect(wrapper.find('p').length).toBe(0);
  });

  it('should call loginWithPassword with the form data', function () {
    const email = 'test@email.com';
    const password = 'password123';
    const spy = jest.fn();
    const wrapper = shallow(<Login loginWithPassword={spy} />);

    wrapper.setState({ email, password });
    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    expect(spy.mock.calls[0][0]).toEqual({ email });
    expect(spy.mock.calls[0][1]).toEqual(password);
  });

  it('should set loginWithPassword callback errors', function () {
    const spy = jest.fn();
    const wrapper = shallow(<Login loginWithPassword={spy} />);

    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    spy.mock.calls[0][2]({});
    expect(wrapper.state('error').length).not.toBe(0);

    spy.mock.calls[0][2]();
    expect(wrapper.state('error')).toBe('');
  });

});
