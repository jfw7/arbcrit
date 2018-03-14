require('dotenv').config()
const bing = require('node-bing-api')({
  accKey: process.env.BING_SEARCH_API_KEY,
  rootUri: 'https://api.cognitive.microsoft.com/bing/v7.0/',
});
const microsofComputerVision = require('microsoft-computer-vision');

const data = require('bracket-data')({
  year: '2018',
  sport: 'ncaam'
});

const teams = Object.values(data.bracket.regions).reduce((arr, o) => arr.concat(o.teams), []);

const imageOptions = {
  'Ocp-Apim-Subscription-Key': process.env.COMPUTER_VISION_API_KEY,
  'request-origin':'westcentralus',
  'content-type': 'application/json',
  'max-candidates': 1,
};


for (let i = 0; i < teams.length - 1; i++) {
  const team = teams[i];
  setTimeout(
    team => bing.images(`${team} mascot`, {
      count: '1',
    }, (error, result, body) => {
      if (error) {
        console.log(error);
        process.exit();
      }
      const url = body.value[0].thumbnailUrl;
      microsofComputerVision.describeImage({
        'Ocp-Apim-Subscription-Key': process.env.COMPUTER_VISION_API_KEY,
        'request-origin':'westcentralus',
        'content-type': 'application/json',
        'max-candidates': 1,
        url,
      }).then(result => {
        console.log(team);
        console.log(url);
        console.log(result.description.captions[0]);
        console.log('');
      });
    }),
    i * 3500,
    teams[i]
  );
}
