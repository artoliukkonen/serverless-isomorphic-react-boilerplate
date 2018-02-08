import apiClient from './get/posts';
import webClient from './src/server';

/*
  BOILERPLATE STARTS HERE
  Usually you don't have to touch anything below this.
  (unless you are using this for actual production app and need to use Cognito & SNS & such)
  */

export function webapp(event, context, callback) {
  return Promise.resolve()
    .then(() => {
      if (event.httpMethod && event.resource) {
        console.log('PROCESSING WEBAPP REQUEST', event.httpMethod, event.resource);

        if (event.path === '/favicon.ico') {
          callback(null, {});
          return;
        }

        webClient(event)
          .then((body) => {
            callback(
              null,
              {
                statusCode: 200,
                headers: {
                  'content-type': 'text/html; charset=utf-8',
                },
                body,
              },
            );
          });
      }
    });
}

export function staticFile(event, context, callback) {
  // This is a proxy for static files (i.e. bundled React app)
  // This is only used in `sls offline`
  // TODO: Disable in production build

  const fs = require('fs'); // eslint-disable-line global-require
  const mime = require('mime-types'); // eslint-disable-line global-require

  const data = fs.readFileSync(`./build${event.path}`, 'base64');
  const contentType = mime.lookup(`./build${event.path}`);

  callback(
    null,
    {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        'Content-Type': contentType,
      },
      body: data,
    },
  );
}

export function request(event, context, callback) {
  return Promise.resolve()
    .then(() => {
      if (event.httpMethod && event.path) {
        console.log('PROCESSING HTTP EVENT', event.httpMethod, event.path);
        return apiClient(event);
      }
      console.log('UNKNOWN EVENT', event);
      return {};
    })
    .then(sendProxySuccess.bind(null, callback), sendProxyError.bind(null, callback)); // eslint-disable-line
}

function sendProxySuccess(callback, responseObj) {
  const response = responseObj && responseObj.statusCode ? responseObj : {
    statusCode: 200,
    body: JSON.stringify(responseObj),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  callback(null, response);
}

function sendProxyError(callback, err) {
  console.log('ERROR:', err.stack || err);
  let status = 500;
  let message = err.message || JSON.stringify(err);
  const m = err.message && err.message.match(/^\[(\d+)\] *(.*)$/);
  if (m) {
    [, status, message] = m;
  }
  const response = {
    statusCode: status,
    body: JSON.stringify({ errorMessage: message }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  callback(null, response);
}
