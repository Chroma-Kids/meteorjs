import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../common/Header';
import { Toolbar } from '../common/Toolbar';

describe('PrivateHeader', function () {

  it('should set a button text to logout', function () {
    const wrapper = shallow(<Header title="Test title" handleLogout={() => { }} />);
    const buttonText = wrapper.find('a').text();

    expect(buttonText).toBe(' Logout');
  });

  it('should use title prop as an h1', function () {
    const title = 'Test title';
    const wrapper = shallow(<Toolbar title={title} handleLogout={() => { }} />);
    const actualTitle = wrapper.find('h2').text();

    expect(actualTitle).toBe(title);
  });

  it('should call handleLogout on click', function () {
    const spy = jest.fn();
    const wrapper = shallow(<Header title="Title" handleLogout={spy} />);

    wrapper.find('button').simulate('click');

    expect(spy).toHaveBeenCalled();
  });

});
