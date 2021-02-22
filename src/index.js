console.log('Random joke web service starting up ...');

// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');
const query = require('querystring');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./responses.js');

const urlStruct = {
  GET: {
    '/random-joke': jsonHandler.getRandomJokeResponse,
    '/random-jokes': jsonHandler.getRandomJokesResponse,
    '/default-styles.css': htmlHandler.getCSS,
    notFound: htmlHandler.get404Response,
  },
  HEAD: {
    '/random-joke': jsonHandler.getRandomJokeResponse,
    '/random-jokes': jsonHandler.getRandomJokesResponse,
  },
};

const onRequest = (request, response) => {
  let acceptedTypes = request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  const parsedUrl = url.parse(request.url);
  const {
    pathname,
  } = parsedUrl;

  const params = query.parse(parsedUrl.query);
  const {
    limit,
  } = params;
  console.log('limit=', limit);

  console.dir(parsedUrl.pathname);
  console.dir(request.method);

  if (urlStruct[request.method][pathname]) {
    urlStruct[request.method][pathname](request, response, params, acceptedTypes, request.method);
  } else {
    urlStruct[request.method].notFound(request, response, params, acceptedTypes, request.method);
  }
};

http.createServer(onRequest).listen(port); // method chaining!

console.log(`Listening on 127.0.0.1: ${port}`);
