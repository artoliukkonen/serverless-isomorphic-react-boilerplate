import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';

import Html from './client/components/Html';
import routes from './client/routes';
import reducers from './client/redux/modules';

import manifest from '../build/assets-manifest.json';

import createMiddleware from './client/redux/middleware/clientMiddleware';
import ApiClient from './client/helpers/ApiClient';

const client = new ApiClient();

const middleware = [createMiddleware(client), thunk];

const store = createStore(reducers, {}, applyMiddleware(...middleware));

const App = (event) => {
  const branch = matchRoutes(routes, event.path);
  console.time('fetchData');

  const promises = branch.map(({ route }) => {
    const fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store, event.path) : Promise.resolve(null)
  });
  return Promise.all(promises).then(() => {
    console.timeEnd('fetchData');

    console.time('renderResponse');

    const context = {};
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={event.path} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>,
    );

    const helmet = Helmet.renderStatic();
    const sheet = new ServerStyleSheet();
    const styles = sheet.getStyleElement();

    if (context.status === 404) {
      console.log('404');
    }
    if (context.status === 302) {
      console.log('302');
    }

    const html = renderToStaticMarkup(
      <Html markup={content} store={store} manifest={manifest} helmet={helmet} styles={styles} />,
    );
    console.timeEnd('renderResponse');

    return html;
  });
};

export default App;
