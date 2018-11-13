import React from 'react';
import { shallow } from 'enzyme';
import Calendar from '../client/components/Calendar';

const monthGrid = [
  [null, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [27, 29, 30, null, null, null, null],
];

const today = {
  day: 24,
  month: 10,
  year: 2018,
};

const mockGenerateCalendar = jest.fn();

const shallowWrap = shallow(
  <Calendar
    monthGrid={monthGrid}
    generateCalendar={mockGenerateCalendar}
    selectedDate={today}
    today={today}
    browseDate={today}
  />,
);

describe('<Calendar />', () => {
  test('contains 3 span elements within `head` div', () => {
    expect(shallowWrap.find('.head span').length).toBe(3);
  });

  test('div with class `weekday` contains 7 spans which refers to 7 weekdays', () => {
    expect(shallowWrap.find('.weekday span').length).toBe(7);
  });

  test('div with class `weekday` contains 7 spans which refers to 7 weekdays', () => {
    expect(shallowWrap.find('.weekday span').length).toBe(7);
  });

  test('should render calendar with 1 weekday row and 5 week rows', () => {
    expect(shallowWrap.find('CalendarBody div').length).toBe(6);
  });

  test('the span element that corresponds to today should have `selected` class', () => {
    expect(shallowWrap.find('CalendarBody div').at(4).find('span').at(3)
      .hasClass('selected')).toBe(true);
  });

  test('span elements whose date is before today should have `disabled` class', () => {
    expect(shallowWrap.find('.disabled').length).toBe(28);
  });

  test('span elements in weekday row should not have any class', () => {
    expect(shallowWrap.find('.weekday span').every('selected')).toBe(false);
    expect(shallowWrap.find('.weekday span').every('disabled')).toBe(false);
  });

  test('generateCalendar is invoked when left or right icon is clicked', () => {
    shallowWrap.find('#left').simulate('click');
    expect(mockGenerateCalendar).toBeCalled();
  });

  test('generateCalendar is invoked when right icon is clicked', () => {
    shallowWrap.find('#right').simulate('click');
    expect(mockGenerateCalendar).toBeCalled();
  });
});
