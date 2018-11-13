import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import ReservationForm from './components/Reservation-Form';
import Hour from './components/Hour';

const Sidebar = styled.div`
  width: 300px;
`;

const Wrapper = styled.div`
  background-color: white;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  width: 100%;
  padding: 14px;
`;

const Rail = styled.div`
  border-left: 1px solid #c1c1c1;
  width: 100%;
  box-sizing: border-box;
  padding-left: 30px;
`;

const Heading = styled.h4`
  margin: 0;
  margin-bottom: 11px;
  padding: 0 11px;
  span {
    margin-left: 10px;
  }
`;

const ReservationFormWrapper = styled.div`
  margin: 0;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      reservations: [],
      hours: [],
    };
  }

  componentDidMount() {
    const restaurantId = window.location.pathname.slice(1);
    axios.get(`http://54.193.93.59:5882/api/${restaurantId}/reservation`)
      .then((response) => {
        const reservations = response.data.map(reservation => (
          Object.assign({}, reservation, {
            time: moment(reservation.time).format('kk:mm'),
            date: moment(reservation.time).format('MM YYYY'),
          })
        ));
        axios.get(`http://54.193.93.59:5882/api/${restaurantId}/hour`)
          .then((result) => {
            const hours = result.data.map(weekday => (
              Object.assign({}, weekday, {
                opening_hour: weekday.openingHour.slice(0, 5),
                closing_hour: weekday.closingHour.slice(0, 5),
              })
            ));
            this.setState({
              reservations,
              hours,
            });
          });
      });
  }

  render() {
    const {
      reservations,
      hours,
    } = this.state;
    return (
      <Sidebar>
        <Wrapper>
          <Heading>
            <i className="far fa-calendar" />
            <span>Make a Reservation</span>
          </Heading>
          <ReservationFormWrapper>
            <ReservationForm
              reservations={reservations}
              hours={hours}
            />
          </ReservationFormWrapper>
        </Wrapper>
        <Rail>
          <Hour hours={hours} />
        </Rail>
      </Sidebar>
    );
  }
}

export default App;

render(
  <App />,
  document.querySelector('#yump-reservation-hours'),
);
