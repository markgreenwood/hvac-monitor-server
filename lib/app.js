const express = require('express');
const bodyParser = require('body-parser');
const request = require('superagent');
const path = require('path');
const app = express();
// const morgan = require('morgan');
const moment = require('moment');

// app.use(morgan('dev'));

app.use(bodyParser.json());

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

app.get('/api/temperature', (req, res, next) => { // eslint-disable-line no-unused-vars
  const startdt = moment(parseInt(req.query.start));
  const enddt = moment(parseInt(req.query.end));
  const days = [];
  let day = startdt;
  while (day <= enddt) {
    days.push(moment(day));
    day.add(1, 'day');
  }
  const apiKey = process.env.APIKEY;
  Promise.all(
    days.map(date => {
      return request
        .get(`https://api.darksky.net/forecast/${apiKey}/45.5898,-122.5951,${date.unix()}`)
        .then((results) => {
          const { currently, hourly } = results.body;
          return {
            date: moment.unix(currently.time).format('MM/DD/YYYY'),
            tempdata: hourly.data.map((datapt) => {
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