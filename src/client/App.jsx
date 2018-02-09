import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { context, location, store, type } = this.props;

    return (
      <Provider store={store}>
        {type === 'client' ? (
          <BrowserRouter>
            <ScrollToTop>
              {renderRoutes(routes)}
            </ScrollToTop>
          </BrowserRouter>
        ) : (
          <StaticRouter context={context} location={location}>
            {renderRoutes(routes)}
          </StaticRouter>
        )}
      </Provider>
    );
  }
}

/* eslint-disable react/no-multi-comp */
class ScrollToTop extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return this.props.children;
  }
}

App.propTypes = {
  context: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default App;
