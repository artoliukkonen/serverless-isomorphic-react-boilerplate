import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0%{
      background-position: -468px 0
  }
  100%{
      background-position: 468px 0
  }
`;

const AnimatedBackground = styled.div`
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${shimmer};
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  height: 96px;
  position: relative;
`;

const Loader = () => (
  <AnimatedBackground />
);

export default Loader;
