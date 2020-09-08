import 'mocha';
import sinon from 'sinon';

import UserService from '../src/services/user-service';
import UserDatabase from '../src/database/user-database';

describe('API', function () {
    describe('Register users', function () {
        it('register a new user', function () {
            const sb = sinon.stub(UserDatabase.prototype, 'create');

            // const userService = new UserService(database);

            // requester
            //     .post('/api/register')
            //     .send(testUser)
            //     .end((err, res) => {
            //         expect(res.status).equal(200);
            //         done();
            //     });
        });

        // it('register an already existing user', function (done) {
        //     requester
        //         .post('/api/register')
        //         .send(testUser)
        //         .end((err, res) => {
        //             expect(res.status).equal(200);

        //             done();
        //         });
        // });
    });

    // describe('POST Login', function () {
    //     it('should return false when not giving any information', function (done) {
    //         requester.post('/login').end((err, res) => {
    //             expect(res.status).equal(400);

    //             done();
    //         });
    //     });

    //     it('success at correct login information', function (done) {
    //         requester
    //             .post('/api/login')
    //             .send({ username: 'dennis', password: 'sdu' })
    //             .end((err, res) => {
    //                 expect(res.status).equal(200);
    //                 expect(res.body).to.have.property('accessToken');
    //                 expect(res.body).to.have.property('refreshToken');

    //                 done();
    //             });
    //     });
    // });

    // describe('POST Refresh', async function () {
    //     it('Login and sends refresh token to get a new access token', async function () {
    //         const login = await requester
    //             .post('/api/login')
    //             .send({ username: 'dennis', password: 'sdu' });
    //         const { accessToken, refreshToken } = login.body;

    //         const res = await requester
    //             .post('/api/refresh')
    //             .set('Authorization', `Bearer ${accessToken}`)
    //             .send({ refreshToken });

    //         expect(res.status).equal(200);
    //         expect(res.body).to.have.property('accessToken');
    //     });

    //     it('No Authorization header when requesting ', async function () {
    //         const res = await requester
    //             .post('/api/refresh')
    //             .send({ refreshToken: '' });

    //         expect(res.status).equal(401);
    //     });
    // });
});
