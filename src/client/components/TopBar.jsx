import React from 'react';
import styled from 'styled-components';
import Flex from '../components/Flex';
import colors from '../colors';

const Section = styled(Flex)`
  height: 2rem;
  width: 100%;
  background-color: ${colors.black};
  margin-bottom: 1rem;
  vertical-align: middle;

  @media print {
    display: none;
  }
`;
const TopAds = () => (
  <Section row justify="center">
    &nbsp;
  </Section>
);

export default TopAds;
