const POSTS_REQUEST = 'client/posts/POSTS_REQUEST';
const POSTS_SUCCESS = 'client/posts/POSTS_SUCCESS';
const POSTS_FAILURE = 'client/posts/POSTS_FAILURE';

const POST_REQUEST = 'client/posts/POST_REQUEST';
const POST_SUCCESS = 'client/posts/POST_SUCCESS';
const POST_FAILURE = 'client/posts/POST_FAILURE';

const initialState = {
  loading: false,
  category: 0,
  posts: [],
  fetchedLatest: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POSTS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.result,
        loading: false,
        fetchedLatest: Date.now(),
      };
    }

    case POST_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case POST_SUCCESS: {
      const posts = [...state.posts];
      const post = action.result;

      let cachedPost = posts.find(p => p.id === post.id);

      if (cachedPost) {
        cachedPost = post;
      } else {
        posts.push(post);
      }
      return {
        ...state,
        posts,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export function loadPosts() {
  return {
    types: [POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE],
    promise: client =>
      client.get('posts'),
  };
}

export function loadPost(id) {
  return {
    types: [POST_REQUEST, POST_SUCCESS, POST_FAILURE],
    promise: client =>
      client.get(`posts/${id}`),
  };
}
