import React from 'react';
import { shallow } from 'enzyme';
import People from '../client/components/People';

const wrapper = shallow(<People />);

describe('<People />', () => {
  test('contains a span with class `left`', () => {
    expect(wrapper.find('span.left').length).toBe(1);
  });

  test('contains an icon with class `fas` and `fa-users` inside `.left`', () => {
    expect(wrapper.find('span i.fas.fa-users').length).toBe(1);
  });

  test('contains select element', () => {
    expect(wrapper.find('select').length).toBe(1);
  });

  test('select element contains 7 options', () => {
    expect(wrapper.find('select option').length).toBe(8);
  });

  test('contains a span with class `right`', () => {
    expect(wrapper.find('span.right').length).toBe(1);
  });

  test('contains an icon with class `fas` and `fa-caret-down` inside `.right`', () => {
    expect(wrapper.find('span.right i.fas.fa-caret-down').length).toBe(1);
  });
});
