import React from 'react';
import { shallow } from 'enzyme';
import Date from '../client/components/Date';

const wrapper = shallow(<Date toggleCalendar={() => {}} selectedDate={() => {}} />);

describe('<Date />', () => {
  test('contains a span element with class `left`', () => {
    expect(wrapper.find('span.left').length).toBe(1);
  });

  test('contains an icon element with class `far` and `fa-calendar` inside `.left`', () => {
    expect(wrapper.find('span.left i.far.fa-calendar').length).toBe(1);
  });

  test('contains an input element', () => {
    expect(wrapper.find('input').length).toBe(1);
  });

  test('contains a span element with class `right`', () => {
    expect(wrapper.find('span.right').length).toBe(1);
  });

  test('contains an icon element with class `far` and `fa-caret-down` inside `.right`', () => {
    expect(wrapper.find('span.right i.fas.fa-caret-down').length).toBe(1);
  });
});
