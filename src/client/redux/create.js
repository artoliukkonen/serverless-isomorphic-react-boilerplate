import { createStore as _createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createMiddleware from './middleware/clientMiddleware';
import reducer from './modules/index';

export default function createStore(initialState, client) {
  // Sync dispatched route actions to the history
  // const reduxRouterMiddleware = routerMiddleware(/* history */);
  const defaultMiddleware = [createMiddleware(client), thunk];
  let middleware;
  if (process.env.NODE_ENV !== 'production') {
    middleware = compose(
      applyMiddleware(...defaultMiddleware),
      applyMiddleware(logger),
    );
  } else {
    middleware = applyMiddleware(...defaultMiddleware);
  }

  const store = _createStore(
    reducer,
    initialState,
    middleware,
  );

  if (module.hot) {
    module.hot.accept('./modules/index', () => {
      store.replaceReducer(require('./modules/index')); // eslint-disable-line
    });
  }

  return store;
}
