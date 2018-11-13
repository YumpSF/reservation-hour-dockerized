import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const OuterCalendar = styled.li`
  width: 100%;
  position: absolute;
  z-index: 9999;
  background-color: white;
  padding: 3px;
  box-sizing: border-box;
`;

const InnerCalendar = styled.div`
  border: 1px solid #ccc;
  border-right: none;
  border-shadow: 0 1px 2px rgba(10,10,10,0.2);
  border-radius: 5px;
  width: 100%;
  align: right;
`;

const CalendarHead = styled.div`
  margin: 0 auto;
  border-right: 1px solid #ccc;
  div {
    display: flex;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(100% / 7);
      height: 36px;
      box-model: border-box;
      padding: 3px;
      &.month {
        width: calc(5 * (100% / 7));
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
`;

const CalendarBody = styled.div`
  margin: 0 auto;
  div {
    display: flex;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(100% / 7);
      height: 38px;
      border-top: 1px solid #ccc;
      border-right: 1px solid #ccc;
      font-size: 14px;
      &.selected {
        background-color: rgba(207,18,0,0.8);
        color: white;
        font-weight: bold;
      }
      &.disabled {
        color: #e6e6e6;
        cursor: not-allowed;
      }
    }
    &.weekday {
      span {
        height: 23px;
        border: none;
        color: #d32323;
        font-size: 12px;
        font-weight: bold;
        &:last-of-type {
          border-right: 1px solid #ccc;
        }
      }
    }
  }
`;
CalendarBody.displayName = 'CalendarBody';

class Calendar extends Component {
  static propTypes = {
    generateCalendar: PropTypes.func.isRequired,
    toggleSelected: PropTypes.func.isRequired,
    previousMonth: PropTypes.func.isRequired,
    nextMonth: PropTypes.func.isRequired,
    monthGrid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    selectedDate: PropTypes.objectOf(PropTypes.number).isRequired,
    browseDate: PropTypes.objectOf(PropTypes.number).isRequired,
    today: PropTypes.objectOf(PropTypes.number).isRequired,
  };

  componentDidMount() {
    const { generateCalendar } = this.props;
    generateCalendar();
  }

  render() {
    const {
      previousMonth, nextMonth, generateCalendar, monthGrid, toggleSelected,
      selectedDate: {
        day: targetDay,
        month: targetMonth,
        year: targetYear,
      },
      today: {
        day: todayDay,
        month: todayMonth,
        year: todayYear,
      },
      browseDate: {
        month: browseMonth,
        year: browseYear,
      },
    } = this.props;
    const header = moment(`${browseMonth} ${browseYear}`, 'M YYYY').format('MMMM YYYY');

    return (
      <OuterCalendar>
        <InnerCalendar>
          <CalendarHead>
            <div className="head">
              <span
                id="left"
                role="button"
                onClick={async () => {
                  await new Promise((resolve) => {
                    previousMonth();
                    resolve();
                  });
                  generateCalendar();
                }}
              >
                <i className="fas fa-angle-double-left" />
              </span>
              <span className="month">{header}</span>
              <span
                id="right"
                role="button"
                onClick={async () => {
                  await new Promise((resolve) => {
                    nextMonth();
                    resolve();
                  });
                  generateCalendar();
                }}
              >
                <i className="fas fa-angle-double-right" />
              </span>
            </div>
          </CalendarHead>
          <CalendarBody>
            <div className="weekday">
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
            </div>
            {monthGrid.map(week => (
              <div>
                {week.map((day) => {
                  if (
                    (browseYear < todayYear)
                    || (browseMonth < todayMonth && browseYear <= todayYear)
                    || (day < todayDay && browseMonth <= todayMonth && browseYear <= todayYear)
                  ) {
                    return (
                      <span className="disabled" role="button" onClick={toggleSelected}>{day}</span>
                    );
                  }
                  if (
                    day === targetDay
                    && browseMonth === targetMonth
                    && browseYear === targetYear
                  ) {
                    return (
                      <span className="selected" role="button" onClick={toggleSelected}>{day}</span>
                    );
                  }
                  return (
                    <span role="button" onClick={toggleSelected}>{day}</span>
                  );
                })}
              </div>
            ))}
          </CalendarBody>
        </InnerCalendar>
      </OuterCalendar>
    );
  }
}

export default Calendar;
