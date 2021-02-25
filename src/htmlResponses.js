const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const jokePage = fs.readFileSync(`${__dirname}/../client/joke-client.html`);

const css = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

const get404Response = (request, response) => {
  response.writeHead(404, {
    'Content-Type': 'text/html',
  });
  response.write(errorPage);
  response.end();
};

const getJokeResponse = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write(jokePage);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/css',
  });
  response.write(css);
  response.end();
};

module.exports.get404Response = get404Response;
module.exports.getCSS = getCSS;
module.exports.getJokeResponse = getJokeResponse;
