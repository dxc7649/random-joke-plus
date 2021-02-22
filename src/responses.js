const _ = require('underscore');

let jokes = [
  {
    q: 'What do you call a very small valentine?',
    a: 'A valen-tiny!',
  },
  {
    q: 'What did the dog say when he rubbed his tail on the sandpaper?',
    a: 'Ruff, Ruff!',
  },
  {
    q: "Why don't sharks like to eat clowns?",
    a: 'Because they taste funny!',
  },
  {
    q: 'What did the boy cat say to the girl cat?',
    a: "You're Purr-fect!",
  },
  {
    q: "What is a frog's favorite outdoor sport?",
    a: 'Fly Fishing!',
  },
  {
    q: 'I hate jokes about German sausages.',
    a: 'Theyre the wurst.',
  },
  {
    q: 'Did you hear about the cheese factory that exploded in France?',
    a: 'There was nothing left but de Brie.',
  },
  {
    q: 'Our wedding was so beautiful ',
    a: 'Even the cake was in tiers.',
  },
  {
    q: 'Is this pool safe for diving?',
    a: 'It deep ends.',
  },
  {
    q: 'Dad, can you put my shoes on?',
    a: 'I dont think theyll fit me.',
  },
  {
    q: 'Can February March?',
    a: 'No, but April May',
  },
  {
    q: 'What lies at the bottom of the ocean and twitches?',
    a: 'A nervous wreck.',
  },
  {
    q: 'Im reading a book on the history of glue.',
    a: 'I just cant seem to put it down.',
  },
  {
    q: 'Dad, can you put the cat out?',
    a: 'I didnt know it was on fire.',
  },
  {
    q: 'What did the ocean say to the sailboat?',
    a: 'Nothing, it just waved.',
  },
  {
    q: 'What do you get when you cross a snowman with a vampire?',
    a: 'Frostbite',
  },
];

const respond = (request, response, content, type) => {
  response.writeHead(200, {
    'Content-Type': type,
  });
  response.write(content);
  response.end();
};

// One joke
const getRandomJokeJSON = () => {
  const randomNumber = Math.floor(Math.random() * 16);

  // return JSON.stringify(jokes[randomNumber]);
  return jokes[randomNumber];
};

const getRandomJokeResponse = (request, response, params, acceptedTypes) => {
  if (acceptedTypes.includes('text/xml') === true) {
    const jokeXML = getRandomJokeJSON();

    const responseXML = `
            <joke>
                <q>${jokeXML.q}</q>
                <a>${jokeXML.a}</a>
            </joke>
    `;
    return respond(request, response, responseXML, 'text/xml');
  }

  const jokeString = JSON.stringify(getRandomJokeJSON());
  return respond(request, response, jokeString, 'application/json');
};
// End of One joke

// Multiple jokes
const getRandomJokesJSON = (limit = 1) => {
  let limit2 = Number(limit);
  const jokesLength = jokes.length;

  limit2 = !limit2 ? 1 : limit;
  limit2 = limit2 < 1 ? 1 : limit2;
  limit2 = limit2 > jokesLength ? jokesLength - 1 : limit2;

  jokes = _.shuffle(jokes);
  const jokesKeys = [...jokes.keys()];

  const sliceKeys = jokesKeys.slice(0, limit2);

  const randomJokes = [];
  sliceKeys.forEach((keys) => {
    randomJokes.push(jokes[keys]);
  });

  return randomJokes;
};

const getRandomJokesResponse = (request, response, params, acceptedTypes) => {
  if (acceptedTypes.includes('text/xml') === true) {
    const jokesXML = getRandomJokesJSON(params.limit);

    response.writeHead(200, {
      'Content-Type': 'text/xml',
    });

    response.write('<jokes>');
    for (let i = 0; i < jokesXML.length; i += 1) {
      response.write(`
            <joke>
                <q>${jokesXML[i].q}</q>
                <a>${jokesXML[i].a}</a>
            </joke>
        `);
    }
    response.write('</jokes>');

    response.end();
  } else {
    const jokesString = JSON.stringify(getRandomJokesJSON(params.limit));
    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
    response.write(jokesString);
    response.end();
  }
};
// End of multiple jokes

module.exports.getRandomJokeResponse = getRandomJokeResponse;
module.exports.getRandomJokesResponse = getRandomJokesResponse;
