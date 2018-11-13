import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Weekday from './Weekday';

const Wrapper = styled.div`
  h4 {
    color: #d32323;
    margin-bottom: 14px;
  }
`;

const Hour = ({ hours }) => (
  <Wrapper>
    <h4>Hour</h4>
    <div>
      {hours.map(weekday => (
        <Weekday weekday={weekday} />
      ))}
    </div>
  </Wrapper>
);

Hour.propTypes = {
  hours: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default Hour;
