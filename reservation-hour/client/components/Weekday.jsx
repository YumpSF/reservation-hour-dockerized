import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const WeekdayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-size: 14px;
    &.weekday {
      width: 54px;
      font-weight: bold;
    }
    &.hours {
      flex-grow: 3;
    }
    &.open {
      color: #41a700;
      font-size: 12px;
      font-weight: bold;
      padding-right: 8px;
    }
    &.closed {
      font-size: 12px;
      font-weight: bold;
      color: #d32323;
      padding-right: 8px;
    }
  }
`;

const Weekday = ({ weekday }) => {
  const day = moment(weekday.weekday, 'd').format('ddd');
  const opening = moment(weekday.opening_hour, 'kk:mm').format('hh:mm a');
  const closing = moment(weekday.closing_hour, 'kk:mm').format('hh:mm a');
  const todayDay = moment().format('d');
  const todayHour = moment().format('kk');
  let today;
  if (
    parseInt(todayDay, 10) === parseInt(weekday.weekday, 10)
    && parseInt(todayHour, 10) <= parseInt(moment(weekday.closing_hour, 'kk:mm').format('kk'), 10)
    && parseInt(todayHour, 10) >= parseInt(moment(weekday.opening_hour, 'kk:mm').format('kk'), 10)
  ) {
    today = <span className="open">Open now</span>;
  } else if (
    parseInt(moment().format('d'), 10) === parseInt(weekday.weekday, 10)
  ) {
    today = <span className="closed">Closed Now</span>;
  }
  return (
    <WeekdayWrapper>
      <span className="weekday">
        {day}
      </span>
      <span className="hours">
        <div>{`${opening} -`}</div>
        <div>{closing}</div>
      </span>
      <span className="extra">
        {today}
      </span>
    </WeekdayWrapper>
  );
};

Weekday.propTypes = {
  weekday: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Weekday;
