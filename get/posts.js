/**
 * This is a proxy for REST API
 * It will cache results for CACHE_TIME (default 5) minutes
 */
import 'isomorphic-fetch';
import crypto from 'crypto';

const API_BASE = 'https://jsonplaceholder.typicode.com/';

const CACHE_TIME = 5; // minutes

const emptyCache = {};
const postCache = emptyCache;

export default function (event) {
  const API_PATH = event.path.slice(5); // Remove `/api/` from the URL

  let API_QUERYSTRING = '?';
  if (event.queryStringParameters) {
    Object.keys(event.queryStringParameters).forEach((key) => {
      API_QUERYSTRING += `&${key}=${event.queryStringParameters[key]}`;
      return API_QUERYSTRING;
    });
  }

  const now = Date.now();
  const pathHash = crypto.createHash('md5').update(API_PATH + API_QUERYSTRING).digest('hex');

  if (postCache[pathHash] && postCache[pathHash].expires > now) {
    return postCache[pathHash].data;
  }

  return fetch(API_BASE + API_PATH + API_QUERYSTRING) // eslint-disable-line no-undef
    .then(res => res.json())
    .then((data) => {
      postCache[pathHash] = {
        data,
        expires: now + (1000 * 60 * CACHE_TIME),
      };
      return data;
    });
}
