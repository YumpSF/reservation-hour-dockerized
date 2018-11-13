import React from 'react';
import styled from 'styled-components';

const PeopleBox = styled.li`
  position: relative;
  padding: 3px;
  width: 50%;
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
  select {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    height: 30px;
    padding: 5px 9px;
    padding-left: 30px;
    border-radius: 3px;
    background-color: white;
    appearance: none;
    cursor: pointer;
  }
  span {
    position: absolute; 
    top: 0;
    bottom: 0;
    height: 20px;
    width: 14px;
    margin: auto;
    &.left {
      left: 10px;
    }
    &.right {
      right: 6px;
    }
  }
`;

const People = () => (
  <PeopleBox>
    <span className="left">
      <i className="fas fa-users" />
    </span>
    <select>
      <option>1 Person</option>
      <option>2 People</option>
      <option>3 People</option>
      <option>4 People</option>
      <option>5 People</option>
      <option>6 People</option>
      <option>7 People</option>
      <option>8 People</option>
    </select>
    <span className="right">
      <i className="fas fa-caret-down" />
    </span>
  </PeopleBox>
);

export default People;
