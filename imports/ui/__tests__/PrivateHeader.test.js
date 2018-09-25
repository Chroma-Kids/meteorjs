import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../common/Header';

describe('PrivateHeader', function () {

  it('should set a button text to logout', function () {
    const wrapper = shallow(<Header title="Test title" handleLogout={() => { }} />);
    const buttonText = wrapper.find('button').text();

    expect(buttonText).toBe('Logout');
  });

  it('should use title prop as an h1', function () {
    const title = 'Test title';
    const wrapper = shallow(<Header title={title} handleLogout={() => { }} />);
    const actualTitle = wrapper.find('h1').text();

    expect(actualTitle).toBe(title);
  });

  it('should call handleLogout on click', function () {
    const spy = jest.fn();
    const wrapper = shallow(<Header title="Title" handleLogout={spy} />);

    wrapper.find('button').simulate('click');

    expect(spy).toHaveBeenCalled();
  });

});
