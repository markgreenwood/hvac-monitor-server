const express = require('express');
const bodyParser = require('body-parser');
const request = require('superagent');
const path = require('path');
const app = express();
const morgan = require('morgan');
const moment = require('moment');

app.use(morgan('dev'));

app.use(bodyParser.json());

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

app.get('/api/temperature', (req, res, next) => { // eslint-disable-line no-unused-vars
  const startdt = moment(parseInt(req.query.start));
  const stopdt = moment(parseInt(req.query.stop));
  const days = [];
  let day = startdt;
  while (day <= stopdt) {
    days.push(moment(day));
    day.add(1, 'day');
  }
  Promise.all(
    days.map(item => {
      return request
        .get(`https://api.darksky.net/forecast/27e7f0187d70e7a7440b1b05d3d3583d/45.5898,-122.5951,${item.unix()}`)
        .then((results) => {
          return {
            date: moment.unix(results.body.currently.time).format('MM/DD/YYYY'),
            tempdata: results.body.hourly.data.map((datapt) => {
              return {
                time: moment.unix(datapt.time).valueOf(),
                temperature: datapt.temperature
              };
            })
          };
        });
    })
  )
  .then(values => {
    res
      .set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      })
      .send(
        // values.reduce((acc, curr) => acc.concat(curr), [])
        values
      );
  })
  .catch((err) => {
    next(err);
  });
});

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const code = err.code || 500;
  const error = (err.code === 500) ? 'Internal Server Error' : err.error;
  res.status(code).set('Access-Control-Allow-Origin', '*').send({ error });
});

module.exports = app;