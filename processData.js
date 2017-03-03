const request = require('request');

const startTime = new Date('6/1/2016');
console.log('startTime.getTime() ', startTime.getTime());

request.get(`https://api.darksky.net/forecast/27e7f0187d70e7a7440b1b05d3d3583d/45.5898,-122.5951,${startTime.getTime()/1000}`,
  (err, resp, body) => {
    if (err) {
      console.log(err);
    }
    else {
      let tempdata = JSON.parse(body).hourly.data.map((datapt) => { return { time: new Date(datapt.time * 1000), temperature: datapt.temperature }; });
      console.log(tempdata);
      // res.send(tempdata);
    }
  });