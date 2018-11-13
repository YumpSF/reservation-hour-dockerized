import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const TimeBox = styled.li`
  padding: 3px;
  width: 50%;
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  cursor: pointer;
  span {
    position: absolute; 
    top: 0;
    bottom: 0;
    height: 20px;
    width: 14px;
    margin: auto;
    cursor: pointer;
    &.left {
      left: 14px;
    }
    &.right {
      right: 6px;
    }
  }
  select {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    height: 30px;
    padding: 5px 9px;
    padding-left: 30px;
    cursor: pointer;
    border-radius: 3px;
    background-color: white;
    appearance: none;
  }
`;

class Time extends Component {
  static propTypes = {
    hours: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      timeArr: [],
    };
  }

  componentDidUpdate() {
    const { hours } = this.props;
    if (hours) {
      this.populateHours();
    }
  }

  populateHours() {
    const { timeArr } = this.state;
    const { hours } = this.props;
    new Promise((resolve, reject) => {
      if (timeArr.length > 0) {
        reject();
      } else {
        resolve();
      }
    })
      .then(() => {
        let time = hours.opening_hour;
        const newTimeArr = [];
        while (time !== hours.closing_hour) {
          newTimeArr.push(time);
          time = moment(time, 'kk:mm').add(30, 'minutes').format('kk:mm');
        }
        newTimeArr.push(time);
        this.setState({
          timeArr: newTimeArr,
        });
      })
      .catch(() => {});
  }

  render() {
    const { timeArr } = this.state;
    if (timeArr.length > 0) {
      return (
        <TimeBox>
          <span className="left">
            <i className="far fa-clock" />
          </span>
          <select>
            {timeArr.map(time => (
              <option>{time}</option>
            ))}
          </select>
          <span className="right">
            <i className="fas fa-caret-down" />
          </span>
        </TimeBox>
      );
    }
    return (
      <TimeBox>
        <span className="left">
          <i className="far fa-clock" />
        </span>
        <select />
        <span className="right">
          <i className="fas fa-caret-down" />
        </span>
      </TimeBox>
    );
  }
}

export default Time;
