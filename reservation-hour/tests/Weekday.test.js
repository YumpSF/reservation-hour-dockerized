import React from 'react';
import { shallow } from 'enzyme';
import Weekday from '../client/components/Weekday';

const mockData = {
  weekday: 0,
  openingHour: '07:00',
  closingHour: '21:00',
  restaurant_id: 23,
};

const wrapper = shallow(<Weekday weekday={mockData} />);

describe('<Weekday />', () => {
  test('has 3 spans', () => {
    expect(wrapper.find('span').length).toBe(3);
  });

  test('renders a `.weekday`', () => {
    expect(wrapper.find('.weekday').length).toBe(1);
  });

  test('renders a `.hours`', () => {
    expect(wrapper.find('.hours').length).toBe(1);
  });

  test('`.hours` contains 2 div', () => {
    expect(wrapper.find('.hours div').length).toBe(2);
  });

  test('renders a `.extra`', () => {
    expect(wrapper.find('.extra').length).toBe(1);
  });
});
