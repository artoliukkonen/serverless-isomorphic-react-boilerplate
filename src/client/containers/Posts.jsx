import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Loader from '../components/Loader';
import { loadPosts } from '../redux/modules/posts';
import PostCard from '../components/PostCard';

const mapStateToProps = state => ({
  posts: state.posts.posts,
  fetchedLatest: state.posts.fetchedLatest,
  loading: state.posts.loading,
});
const bindAction = dispatch => ({
  loadPosts: id => dispatch(loadPosts(id)),
});
class Posts extends React.Component {
  static fetchData(store) {
    return store.dispatch(loadPosts());
  }

  render() {
    if (this.props.loading) return <Loader />;

    return (
      <div>
        <Helmet>
          <title>Posts example | ServerlessWeb.site</title>
        </Helmet>

        <h1>Posts</h1>
        <p>
          This list of posts is loaded from <a href="https://jsonplaceholder.typicode.com/">JSONPlaceholder</a> API.
          If you refresh this page, you will get server-side rendered version (look at the source).
          If you navigate from any other page, content is dynamically loaded.
        </p>
        {this.props.posts.map(post =>
          (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
      </div>
    );
  }
}
Posts.propTypes = {
  loading: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, bindAction)(Posts);
