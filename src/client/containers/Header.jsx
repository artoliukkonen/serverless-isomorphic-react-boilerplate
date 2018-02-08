import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../colors';

const RootElement = styled.div`
  a {
    padding: 1rem;
    color: ${colors.black};
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = () => (
  <RootElement>
    <Link href="/" to="/">Home</Link>
    <Link href="/posts/" to="/posts/">Posts</Link>
  </RootElement>
);

export default Header;
