import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import styled, { injectGlobal } from 'styled-components';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Flex from './Flex';
import Header from '../containers/Header';
import TopBar from '../components/TopBar';
import { loadPosts } from '../redux/modules/posts';
import colors from '../colors';

export const RESPONSIVE_WIDTH = '1200px';

const mapStateToProps = state => ({
  posts: state.posts.posts,
  fetchedLatest: state.posts.fetchedLatest,
  loading: state.posts.loading,
});
const bindAction = dispatch => ({
  loadLatestPosts: () => dispatch(loadPosts()),
});

class Layout extends React.Component {
  componentDidMount() {
    if (!this.props.loading && !this.props.fetchedLatest) {
      this.props.loadLatestPosts();
    }
  }

  render() {
    return (
      <RootElement>
        <Helmet>
          <title>serverless-isomorphic-react-boilerplate</title>
        </Helmet>

        <TopBar />

        <FlexApp column>
          <Header />

          <LayoutContainer row align="flex-start">
            <div style={{ flex: '1' }}>
              <br />
              <Flex row>
                <div style={{ flex: '1', paddingRight: '1rem' }}>
                  {renderRoutes(this.props.route.routes)}
                </div>
              </Flex>
            </div>
          </LayoutContainer>
        </FlexApp>
      </RootElement>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default withRouter(connect(mapStateToProps, bindAction)(Layout));

const RootElement = styled.div`
`;

const FlexApp = styled(Flex)`
  margin: 0 auto;
  padding: 1rem;
  background-color: white;
  max-width: ${RESPONSIVE_WIDTH};
`;

export const LayoutContainer = styled(Flex)`
  width: ${RESPONSIVE_WIDTH};
  max-width: 100%;

  @media (max-width: ${RESPONSIVE_WIDTH}) {
    align-items: initial;
  }
`;

/* eslint-disable no-unused-expressions */
injectGlobal` 
body, html {
  margin: auto;
  color: rgba(68,68,70,1);
  background-color: rgba(250,250,250,1);
  font-family: 'PT Sans', 'Helvetica Neue', sans-serif;

  @media (max-width: ${RESPONSIVE_WIDTH}) {
    padding: 0;
  }
}
* {
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
a:hover {
  color: ${colors.red}!important;
}
p {
  font-size: 1rem;
}
img {
  max-width: 100%;
}

`;
