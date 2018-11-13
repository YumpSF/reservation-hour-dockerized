import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Date from './Date';
import Calendar from './Calendar';
import Time from './Time';
import People from './People';

const ListBox = styled.ul`
  list-style-type: none;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  position: relative;
`;

const SubmitBox = styled.div`
  padding: 3px;
  width: 100%;
  box-sizing: border-box;
  button {
    width: 100%;
    box-sizing: border-box;
    height: 30px;
    padding: 5px 9px;
    border: rgb(51, 51, 51) solid 1px;
    border-radius: 3px;
    font-weight: 700;
    color: white;
    background-color: rgb(60, 181, 46);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    &:hover {
      background-color: #41c532;
    }
  }
`;

class ReservationForm extends Component {
  static propTypes = {
    hours: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      dateClicked: false,
      today: {
        day: parseInt(moment().format('D'), 10),
        month: parseInt(moment().format('M'), 10),
        year: parseInt(moment().format('YYYY'), 10),
      },
      selectedDate: {},
      browseDate: {},
      firstWeekday: moment().startOf('month').format('d'),
      monthGrid: [],
    };
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.generateCalendar = this.generateCalendar.bind(this);
  }

  componentDidMount() {
    const { today: { day, month, year } } = this.state;
    this.setState({
      selectedDate: { day, month, year },
      browseDate: { month, year },
    });
  }

  generateCalendar() {
    const {
      firstWeekday,
      browseDate: {
        month,
      },
    } = this.state;
    const daysOnMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const days = daysOnMonth[month - 1];
    const output = [];
    let week = [];
    for (let i = 0; i < firstWeekday; i += 1) {
      week.push(null);
    }
    for (let j = 1; j <= days; j += 1) {
      week.push(j);
      if (week.length === 7) {
        output.push(week);
        week = [];
      } else if (j === days) {
        while (week.length < 7) {
          week.push(null);
        }
        output.push(week);
      }
    }
    this.setState({
      monthGrid: output,
    });
  }

  previousMonth() {
    const { browseDate: { month, year } } = this.state;
    let updatedMonth = month - 1;
    let updatedYear = year;
    if (updatedMonth === 0) {
      updatedMonth = 12;
      updatedYear = year - 1;
    }
    const updatedWeekday = moment(`${updatedYear} ${updatedMonth}`, 'YYYY MM').format('d');
    this.setState(prevState => ({
      browseDate: Object.assign({}, prevState.browseDate, {
        month: updatedMonth,
        year: updatedYear,
      }),
      firstWeekday: updatedWeekday,
    }));
  }

  nextMonth() {
    const { browseDate: { month, year } } = this.state;
    let updatedMonth = month + 1;
    let updatedYear = year;
    if (updatedMonth === 13) {
      updatedMonth = 1;
      updatedYear = year + 1;
    }
    const updatedWeekday = moment(`${updatedYear} ${updatedMonth}`, 'YYYY MM').format('d');
    this.setState(prevState => ({
      browseDate: Object.assign({}, prevState.browseDate, {
        month: updatedMonth,
        year: updatedYear,
      }),
      firstWeekday: updatedWeekday,
    }));
  }

  toggleSelected(event) {
    if (!event.target.classList.contains('disabled')) {
      const { browseDate, selectedDate } = this.state;
      this.setState({
        selectedDate: Object.assign({}, browseDate, {
          day: parseInt(event.target.textContent, 10),
        }),
      });
      this.toggleCalendar();
    }
  }

  toggleCalendar() {
    this.setState(prevState => ({
      dateClicked: !prevState.dateClicked,
    }));
  }

  render() {
    const {
      today, dateClicked, monthGrid, browseDate, selectedDate,
    } = this.state;
    const { hours } = this.props;
    const header = moment(`${browseDate.month} ${browseDate.year}`, 'M YYYY').format('MMMM YYYY');
    const weekday = moment().format('d');
    let calendar;
    if (dateClicked) {
      calendar = (
        <Calendar
          today={today}
          browseDate={browseDate}
          selectedDate={selectedDate}
          previousMonth={this.previousMonth}
          nextMonth={this.nextMonth}
          generateCalendar={this.generateCalendar}
          toggleSelected={this.toggleSelected}
          toggleCalendar={this.toggleCalendar}
          monthGrid={monthGrid}
        />
      );
    }
    return (
      <ListBox>
        <Date
          toggleCalendar={this.toggleCalendar}
          selectedDate={selectedDate}
        />
        {calendar}
        <Time hours={hours[weekday]} />
        <People />
        <SubmitBox>
          <button type="submit">Find a Table</button>
        </SubmitBox>
      </ListBox>
    );
  }
}

export default ReservationForm;
