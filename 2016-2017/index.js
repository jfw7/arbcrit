const scrapeIt = require('scrape-it');

const bracketUrl = 'http://www.espn.com/mens-college-basketball/tournament/bracket';

scrapeIt(
  bracketUrl,
  {
    teams: {
      listItem: '.region .match a',
      data: {
        name: {},
        id: {
          attr: 'href',
          convert: s => parseInt(s.match(/\d+/)[0]),
        },
      },
    },
  },
  (err, bracket) => {
    bracket.teams.forEach(t => {
      let rosterUrl = `http://www.espn.com/mens-college-basketball/team/roster/_/id/${t.id}`;
      scrapeIt(
        rosterUrl,
        {
          players: {
            listItem: 'tr.oddrow, tr.evenrow',
            data: {
              number: {
                selector: 'td',
                eq: 0,
                convert: s => parseInt(s),
              },
              name: {
                selector: 'td a',
              },
              url: {
                selector: 'td a',
                attr: 'href'
              },
            }
          }
        },
        (err, roster) => {
          roster.players.filter(p => p.number === 23).forEach(
            p => {
              let playerUrl = p.url;
              scrapeIt(
                playerUrl,
                {
                  stats: {
                    listItem: '.mod-player-stats tr',
                    data: {
                      title: {
                        selector: 'td',
                        eq: 0,
                      },
                      points: {
                        selector: 'td',
                        eq: -1,
                      },
                    },
                  },
                },
                (err, player) => {
                  player.stats.forEach(s => {
                    if (s.title === '2016-17' && s.points.indexOf('.') === -1) {
                      console.log(s.points, t.name, p.name)
                    }
                  });
                }
              );
            }
          );
        }
      );
    });
  }
);
