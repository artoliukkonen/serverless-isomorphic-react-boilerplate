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
    this.scrollTo(window, 0, 200);
  }

  scrollTo(element, to, duration) {
    let start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    const animateScroll = () => {       
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTo(0, val);
      if(currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
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
