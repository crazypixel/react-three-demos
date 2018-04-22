import React from 'react';
import styled from 'styled-components';

const Loader = () => <Container />;

export default Loader;

const Container = styled.div`
  position: fixed;
  width: 100px;
  height: 100px;
  left: calc(50% - 50px);
  top: calc(50% - 50px);
  display: flex;
  justify-content: center;
  
  &:before, &:after {
    content: "";
    position: relative;
    display: block;
  }
  
  &:before {
    animation: spinner 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite normal;
    width: 50px;
    height: 50px;
    background-color: #fff;
  }
  
  &:after {
    animation: shadow 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite normal;
    bottom: -25px;
    height: 25px;
    border-radius: 50%;
    background-color: rgba(#000,0.2);
  }

  @keyframes spinner {
    50% {
      border-radius: 50%;
      transform: scale(0.5) rotate(360deg);
    }
    100% {
      transform: scale(1) rotate(720deg);
    }
  }
  @keyframes shadow {
    50% {
      transform: scale(0.5);
      background-color: rgba(#000, 0.1);
    }
  }
`;
