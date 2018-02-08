import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../components/Loader';

const RootElement = styled.ul`
  list-style: none;
  padding-left: 0;

  li {
    padding-bottom: .5rem;

    a {
      color: black;

      span {
        color: #999;
        padding-left: .5rem;
      }
    }
  }
`;

const PostListing = ({ posts }) => {
  if (!posts.length) return <Loader simple />;

  return (
    <RootElement>
      {posts.map(p => (
        <li key={p.id}>
          <Link to={`/uutiset/${p.slug}`}>
            {p.title.rendered}
          </Link>
        </li>
      ))}
    </RootElement>
  );
}

export default PostListing;