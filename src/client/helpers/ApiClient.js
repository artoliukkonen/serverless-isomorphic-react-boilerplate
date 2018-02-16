import 'isomorphic-fetch';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path, local = false) {
  let adjustedPath = path[0] !== '/' ? `/${path}` : path;

  if (!local) {
    // TODO: Get this path from env / sls config
    adjustedPath = `https://0vznfv7sr9.execute-api.eu-west-1.amazonaws.com/dev/api${adjustedPath}`;
  }

  return adjustedPath;
}

export default class ApiClient {
  constructor() {
    methods.forEach(method => // eslint-disable-line
      this[method] = (path, { params, data, local } = {}) => new Promise((resolve, reject) => {

        const init = {
          params,
          data,
          method,
        };

        fetch(formatUrl(path, local), init)
          .then(res => res.json())
          .then(res => resolve(res));
      }));
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
