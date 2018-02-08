import Home from './containers/Home';
import Posts from './containers/Posts';
import Post from './containers/Post';
import Layout from './components/Layout';

const routes = [
  { component: Layout,
    routes: [
      { path: '/',
        exact: true,
        component: Home,
      },
      { path: '/index',
        component: Home,
      },
      { path: '/posts',
        component: Posts,
      },
      { path: '/post/:slug',
        component: Post,
      },
    ],
  },
];

export default routes;
