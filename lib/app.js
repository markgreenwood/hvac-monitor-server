const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(bodyParser.json());

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

app.get('/api/temperature', (req, res, next) => { // eslint-disable-line no-unused-vars
  const startdt = req.query.start;
  //const stop = req.query.stop;
  const startTime = startdt/1000;
  request.get(`https://api.darksky.net/forecast/27e7f0187d70e7a7440b1b05d3d3583d/45.5898,-122.5951,${startTime}`,
    (err, resp, body) => {
      if (err) {
        next(err);
      }
      else {
        let tempdata = JSON.parse(body).hourly.data.map((datapt) => { return { time: new Date(datapt.time * 1000), temperature: datapt.temperature }});
        res.send(tempdata);
      }
    });
});

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const code = err.code || 500;
  const error = (err.code === 500) ? 'Internal Server Error' : err.error;
  res.status(code).send({ error });
});

module.exports = app;