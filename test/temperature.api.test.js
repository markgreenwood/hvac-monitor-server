const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

const moment = require('moment');
const app = require('../lib/app');

describe ('Temperature API', () => {

  const request = chai.request(app);
  const start = moment(new Date('6/1/2016'));
  const end = moment(new Date('6/30/2016'));

  it ('GETs data', (done) => {
    setTimeout(done, 2500);
    request
      .get(`/api/temperature?start=${start.valueOf()}&end=${end.valueOf()}`)
      .then(res => {
        expect(res.body.length).to.equal(30); // 30 days of data
        expect(res.body[0].date).to.equal('06/01/2016'); // first date is 6/1/2016
        expect(res.body[0].tempdata.length).to.equal(24); // should be 24 hourly temperature points
        done();
      })
      .catch(done);
  });

});