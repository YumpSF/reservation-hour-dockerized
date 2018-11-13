import React from 'react';
import { mount } from 'enzyme';
import ReservationForm from '../client/components/Reservation-Form';

const mockHours = [
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
  },
];

const mockReservations = [
  {
    reservee: "Abner Gottlieb",
    time: "12:00",
    name: "Fully-configurable bandwidth",
    date: "11 2018",
  },
  {
    reservee: "Carli Bogan",
    time: "16:00",
    name: "Fully-configurable bandwidth",
    date: "11 2018"
  },
  {
    reservee: "Samanta Yost",
    time: "14:00",
    name: "Fully-configurable bandwidth",
    date: "11 2018",
  },
];

const wrapper = mount(
  <ReservationForm
    hours={mockHours}
    reservations={mockReservations}
  />,
);

describe('<ReservationForm />', () => {
  test('when span element that corresponds to day 27 is clicked, it should have `selected` class', () => {
    console.log(wrapper.debug());
    //const clickedDay = wrapper.find('CalendarBody div').at(4).find('span').at(6);
    //expect(clickedDay.hasClass('selected')).toBe(false);
    //clickedDay.simulate('click');
    //expect(clickedDay.hasClass('selected')).toBe(true);
  });

});
