import React from 'react';
import { shallow, mount } from 'enzyme';
import Hour from '../client/components/Hour';
import Weekday from '../client/components/Weekday';

const mockData = [
  {
    weekday: 0,
    openingHour: '07:00',
    closingHour: '21:00',
    restaurant_id: 23,
  },
  {
    weekday: 1,
    openingHour: '07:00',
    closingHour: '21:00',
    restaurant_id: 23,
  },
  {
    weekday: 2,
    openingHour: '07:00',
    closingHour: '21:00',
    restaurant_id: 23,
  },
  {
    weekday: 3,
    openingHour: '07:00',
    closingHour: '21:00',
    restaurant_id: 23,
  },
  {
    weekday: 4,
    openingHour: '07:00',
    closingHour: '21:00',
    restaurant_id: 23,
  },
  {
    weekday: 5,
    openingHour: '07:00',
    closingHour: '21:00',
    restaurant_id: 23,
  },
  {
    weekday: 6,
    openingHour: '07:00',
    closingHour: '21:00',
    restaurant_id: 23,
  }
];

const shallowWrapper = shallow(<Hour hours={mockData} />);
const mountWrapper = mount(<Hour hours={mockData} />);

describe('<Hour />', () => {
  test('has 1 `h4` element', () => {
    expect(shallowWrapper.find('h4').length).toBe(1);
  });

  test('has 7 Weekday components', () => {
    expect(mountWrapper.find(Weekday).length).toBe(7);
  });
});
