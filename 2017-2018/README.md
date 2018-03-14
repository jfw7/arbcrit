# Highest Confidence in Describing Image of Team Mascot

- uses [`bracket-data`](https://github.com/bracketclub/bracket-data) to get teams in 2017-2018 tournament
- gets top bing image result for "TEAM_NAME mascot" with [`node-bing-api`](https://github.com/goferito/node-bing-api)
- uses azure computer vision api to generate description (with confidence) for image url with [`microsoft-computer-vision`](https://github.com/viane/microsoft-computer-vision)
- logs out team name, image url, description, and confidence. sorting is *not* performed automatically, but see results.csv


## setup
copy .env.example to .env and add azure access keys (https://azure.microsoft.com/en-us/try/cognitive-services/)
```sh
npm install microsoft-computer-vision --save
```

## usage
```sh
node index.js
```
