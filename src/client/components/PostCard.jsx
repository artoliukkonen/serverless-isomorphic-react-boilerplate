import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../colors';

const Section = styled.section`
  border-bottom: 1px solid ${colors.lighterGray};
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  &:after {
    display: block;
    content: " ";
    clear: both;
  }

  a {
    display: flex;
    align-items: center;
  }

  a > div:first-child {
    flex: 1;
  }
`;

const Title = styled.h2`
  color: ${colors.black};
  font-weight: 600;
  margin-bottom: 1rem;
  hyphens: auto;
`;

function PostCard(props) {
  const { title, id } = props.post;

  return (
    <Section>
      <Link to={`/post/${id}`}>
        <div>
          <Title>{title}</Title>
        </div>
      </Link>
    </Section>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
};

PostCard.defaultProps = {
};

export default PostCard;
