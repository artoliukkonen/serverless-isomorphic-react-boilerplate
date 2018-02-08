import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Loader from '../components/Loader';
import { loadPost } from '../redux/modules/posts';

const Section = styled.section`
  text-align: left;
  
  h1 {
    font-size: 1.5rem;
  }

  .wp-caption {
    width: 100%!important;

    img {
      max-width: 100%;
      height: auto;
    }
  }

  .fb-like * {
    max-width: 100%;
  }
`;

const mapStateToProps = state => ({
  posts: state.posts.posts || [],
  loading: state.posts.loading,
});
const bindAction = dispatch => ({
  loadPost: slug => dispatch(loadPost(slug)),
});
class Post extends React.Component {
  static fetchData(store, path) {
    const [, , slug] = path.split('/');
    return store.dispatch(loadPost(slug));
  }

  componentWillReceiveProps(nextProps) {
    const id = parseInt(nextProps.match.params.slug, 10);
    const post = nextProps.posts.find(p => p.id === id);

    if (!post && !nextProps.loading) {
      this.props.loadPost(id);
    }
  }

  /* eslint-disable react/no-danger */
  render() {
    const id = parseInt(this.props.match.params.slug, 10);
    const post = this.props.posts.find(p => p.id === id);

    if (this.props.loading ||
      !this.props.posts ||
      !post) {
      return (
        <Loader />
      );
    }

    return (
      <Section>
        <Helmet>
          <title>{post.title} | ServerlessWeb.site</title>
        </Helmet>

        <div>
          <h1>{post.title}</h1>

          <div>
            {post.body}
          </div>
        </div>
      </Section>
    );
  }
}
Post.propTypes = {
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  loadPost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, bindAction)(Post);
