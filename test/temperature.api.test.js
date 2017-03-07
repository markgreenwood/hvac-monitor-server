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
    setTimeout(done, 2000);
    request
      .get(`/api/temperature?start=${start.valueOf()}&end=${end.valueOf()}`)
      .then(res => {
        expect(res.body.length).to.equal(30);
        done();
      })
      .catch(done);
  });

});