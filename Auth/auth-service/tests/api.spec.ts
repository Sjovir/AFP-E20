import "mocha";
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);

const requester = chai.request(app).keepOpen();

after(() => {
  requester.close();
});

describe('API', function () {
  describe('/POST Register', function () {
    it('when username starts with t, it gives status 400', function (done) {
      requester.post('/register').send({ username: 't', password: 'sdu'}).end((err, res) => {
        expect(res.status).equal(400);

        done();
      });
    });

    it('credentials that not already exists', function (done) {
      requester.post('/register').send({ username: 'dennis', password: 'sdu'}).end((err, res) => {
        expect(res.status).equal(200);

        done();
      });
    });
  });

  describe('/POST Login', function () {
    it('should return false when not giving any information', function (done) {
      requester.post('/login').end((err, res) => {
        expect(res.status).equal(400);

        done();
      });
    });

    it('success at correct login information', function (done) {
      requester.post('/login').send({ username: 'dennis', password: 'sdu'}).end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body).to.have.property('accessToken');
        expect(res.body).to.have.property('refreshToken');

        done();
      });
    });
  });

  describe('/POST Refresh', async function () {
    it('Login and sends refresh token to get a new access token', async function () {
      const login = await requester.post('/login').send({ username: 'dennis', password: 'sdu'});
      const { accessToken, refreshToken } = login.body;

      const res = await requester.post('/refresh').set('Authorization', `Bearer ${accessToken}`).send({ refreshToken });

      expect(res.status).equal(200);
      expect(res.body).to.have.property('accessToken');
    });

    it('No Authorization header when requesting ', async function () {
      const res = await requester.post('/refresh').send({ refreshToken: '' });

      expect(res.status).equal(401);
    });
  });
});
