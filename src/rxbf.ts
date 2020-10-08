import RealtimeAuthClient from './realtime-auth';
import RealtimeClient from './realtime';
import HttpAuthClient from './http-auth';
import HttpClient from './http';

global.fetch = require('node-fetch');
global.AbortController = require('node-abort-controller');

export {
  HttpAuthClient,
  HttpClient,
  RealtimeAuthClient,
  RealtimeClient,
};
