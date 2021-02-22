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
  '/random-joke': jsonHandler.getRandomJokeResponse,
  '/random-jokes': jsonHandler.getRandomJokesResponse,
  notFound: htmlHandler.get404Response,
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

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, params, acceptedTypes);
  } else {
    urlStruct.notFound(request, response, params, acceptedTypes); // send content
  }
};

http.createServer(onRequest).listen(port); // method chaining!

console.log(`Listening on 127.0.0.1: ${port}`);
