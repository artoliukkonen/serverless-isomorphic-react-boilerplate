import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../colors';

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const Section = styled.section`
  max-width: 1140px;
  margin: auto;
  text-align: center;

  @media print {
    max-width: none;
  }
`;

const Title = styled.h1`
  font-family: 'Open Sans';
  font-size: 2.5em;
  color: ${colors.black};
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 0;
`;

const Line = styled.div`
  width: 100%;
  text-align: center;
  width: 60px;
  margin: 0.5em auto 3em auto;
  height: 4px;
  backgroundColor: ${colors.red};
`;

const Subtitle = styled.h2`
  text-transform: uppercase;
  font-family: 'Open Sans';
  font-size: 1.2em;
  color: ${colors.black};
  font-weight: 200;
  text-transform: uppercase;
  margin-top: -1em;
`;

function Page(props) {
  const title = props.title && props.title.length > 0 ? props.title : null;
  let subtitle = null;

  if (props.subtitle && (props.subtitle.length > 0 || typeof props.subtitle === 'object')) {
    subtitle = (<Subtitle>{props.subtitle}</Subtitle>);
  }

  return (
    <Wrapper style={props.style}>
      <Section>
        {title ? <Title>{title}</Title> : null}
        {title ? <Line /> : null}
        {subtitle}
        <div>{props.children}</div>
      </Section>
    </Wrapper>
  );
}

Page.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
};

Page.defaultProps = {
  title: '',
  subtitle: '',
  children: [],
  style: {},
};

export default Page;
