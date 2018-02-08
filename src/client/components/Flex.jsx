import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex: ${props => props.flex ? `${props.flex} 1 0` : 'initial'};
    flex-direction: ${props => props.column ? 'column' : 'row'};
    align-items: ${props => props.align};
    justify-content: ${props => props.justify};

    @media (max-width: 800px) {
      flex-direction: column;
      flex-basis: auto;
    }
  `;

const Flex = ({ children, ...restProps }) => (
  <Container {...restProps}>{children}</Container>
);


Flex.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  flex: PropTypes.number,
  column: PropTypes.bool,
  align: PropTypes.string,
  justify: PropTypes.string,
};

export default Flex;
