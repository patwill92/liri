const Spotify = require('node-spotify-api');
const Twitter = require('twitter');

const spotify = new Spotify({
  id: '53ab4accb30044e3b6b7490e15fe6359',
  secret: '8e717d0dd8404934af1ffe8374f14072'
});

const client = new Twitter({
  consumer_key: 'x2QUDRP4VbsWnusrnIXZWmYGg',
  consumer_secret: 'y5ftSFxlku8c8OXmQjUJuz1sK5aESWNuYIUcOHckj5N9qElnCK',
  access_token_key: '51669760-vZN31BMhaAyHUc8ECOiXcXsuzMyUv3bogYuYgJdpI',
  access_token_secret: '985kK0UdwgZs8b6doY5eC5G97GFM5xH6ZXnmoizoPvvrw'
});


module.exports = {
  client,
  spotify
};
