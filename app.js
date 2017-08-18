const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const {spotify, client} = require('./keys');

const app  = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('index.html')
});

app.post('/spotify', (req, res) => {
  spotify
    .search({ type: 'track', query: req.body.song })
    .then((response) => {
      console.log(response.tracks.items[0].album.artists[0].name);
      console.log(response.tracks.items[0].name);
      console.log(response.tracks.items[0].album.external_urls.spotify);
      console.log(response.tracks.items[0].album.name);
      let arr = [];
      response.tracks.items.forEach((item) => {
        let obj = {
          artist: item.album.artists[0].name,
          song: item.name,
          url: item.album.external_urls.spotify,
          album: item.album.name
        };
        arr.push(obj);
        console.log(item.artists[0].name);
      });
      res.send(arr);
    })
    .catch((err) => {
      console.log(err);
    })
});

app.get('/twitter', (req, res) => {
  client.get('favorites/list', function(error, tweets, response) {
    var myTweets = [];
    tweets.forEach(({text}) => {
      console.log(text);
      myTweets.push(text);
    });
    res.send(myTweets)
  });
});

app.post('/imdb', (req, response) => {
  let url = `http://www.omdbapi.com/?t=${req.body.movie}&y=&plot=short&apikey=40e9cece`;
  axios.get(url).then((res) => {
    let info = {
      Title: res.data.Title,
      Year: res.data.Year,
      'Imdb': res.data.Ratings[0] ? res.data.Ratings[0].Value : 'N/A',
      'Rotten Tomatoes': res.data.Ratings[1] ? res.data.Ratings[1].Value : 'N/A',
      Country: res.data.Country,
      Language: res.data.Language,
      Actors: [res.data.Actors.split(',')]
    };
    response.send(info)
  })
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

// const omdb = `http://www.omdbapi.com/?t=${process.argv.slice(2).join('+')}&y=&plot=short&apikey=40e9cece`;
// axios.get(omdb)
//   .then((res) => {
//     console.log(
//       `
//       Title: ${res.data.Title}
//       Year: ${res.data.Year}
//       IMDB Rating: ${res.data.Ratings[0].Value}
//       Rotten Tomatoes Rating: ${res.data.Ratings[1].Value}
//       Country: ${res.data.Country}
//       Language: ${res.data.Language}
//       Plot: ${res.data.Plot}
//       Actors: ${res.data.Actors}`
//     );
//   });

