const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const request = require('superagent');
const app = express();
const morgan = require('morgan');
const moment = require('moment');

app.use(morgan('dev'));

app.use(bodyParser.json());

// const publicDir = path.join(__dirname, '../public');
// app.use(express.static(publicDir));

app.get('/api/temperature', (req, res, next) => { // eslint-disable-line no-unused-vars
  console.log('req.query.start ', req.query.start, ' is a ', typeof req.query.start);
  const startdt = moment(parseInt(req.query.start));
  console.log('startdt ', startdt);
  const stopdt = moment(parseInt(req.query.stop));
  console.log('stopdt ', stopdt);
  // make an array of dates to go get
  const days = [];
  let day = startdt;
  while (day <= stopdt) {
    days.push(moment(day));
    day.add(1, 'day');
  }
  console.log(days);
  Promise.all([
    request
      .get(`https://api.darksky.net/forecast/27e7f0187d70e7a7440b1b05d3d3583d/45.5898,-122.5951,${days[0].unix()}`)
      .then((results) => {
        return results.body.hourly.data.map((datapt) => {
          return {
            date: moment.unix(datapt.time).format('MM/DD/YYYY'),
            time: moment.unix(datapt.time).valueOf(),
            temperature: datapt.temperature 
          };
        });
      }),
    request
      .get(`https://api.darksky.net/forecast/27e7f0187d70e7a7440b1b05d3d3583d/45.5898,-122.5951,${days[1].unix()}`)
      .then((results) => {
        return results.body.hourly.data.map((datapt) => {
          return {
            date: moment.unix(datapt.time).format('MM/DD/YYYY'),
            time: moment.unix(datapt.time).valueOf(),
            temperature: datapt.temperature 
          };
        });
      }),
    request
      .get(`https://api.darksky.net/forecast/27e7f0187d70e7a7440b1b05d3d3583d/45.5898,-122.5951,${days[2].unix()}`)
      .then((results) => {
        return results.body.hourly.data.map((datapt) => {
          return {
            date: moment.unix(datapt.time).format('MM/DD/YYYY'),
            time: moment.unix(datapt.time).valueOf(),
            temperature: datapt.temperature 
          };
        });
      }),
  ])
  .then(values => {
    res.send(values);
  })
  .catch((err) => {
    next(err);
  });
});

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const code = err.code || 500;
  const error = (err.code === 500) ? 'Internal Server Error' : err.error;
  res.status(code).send({ error });
});

module.exports = app;