import React from 'react';
import { shallow } from 'enzyme';
import { Signup } from '../Signup';

describe('Signup', function () {

  it('should show error messages', function () {
    const error = 'This is not working';
    const wrapper = shallow(<Signup createUser={() => { }} />);

    wrapper.setState({ error });
    expect(wrapper.find('p').text()).toBe(error);

    wrapper.setState({ error: '' });
    expect(wrapper.find('p').length).toBe(0);
  });

  it('should call createUser with the form data', function () {
    const email = 'test@email.com';
    const password = 'password123';
    const spy = jest.fn();
    const wrapper = shallow(<Signup createUser={spy} />);

    wrapper.setState({ email, password });
    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    expect(spy.mock.calls[0][0]).toEqual({ email, password });
  });

  it('should set error if short password', function () {
    const email = 'test@email.com';
    const password = '123                 ';
    const spy = jest.fn();
    const wrapper = shallow(<Signup createUser={spy} />);

    wrapper.find({ name: 'email' }).simulate('change', { target: { value: email } });
    wrapper.find({ name: 'password' }).simulate('change', { target: { value: password } });
    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    expect(wrapper.state('error').length).toBeGreaterThan(0);
  });

  it('should set createUser callback errors', function () {
    const password = 'password123';
    const reason = 'This is why it failed';
    const spy = jest.fn();
    const wrapper = shallow(<Signup createUser={spy} />);

    wrapper.setState({ password });
    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    spy.mock.calls[0][1]({ reason });
    expect(wrapper.state('error')).toBe(reason);

    spy.mock.calls[0][1]();
    expect(wrapper.state('error')).toBe('');
  });

});
