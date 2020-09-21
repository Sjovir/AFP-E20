import 'mocha';
import chai from 'chai';
import chaiAsPromise from 'chai-as-promised';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

chai.use(chaiAsPromise);

import UserService from '../src/services/user-service';
import UserDatabase from '../src/database/user-database';
import RoleDatabase from '../src/database/role-database';

describe('UserService', function () {
    beforeEach(function () {
        this.userDB = new UserDatabase();
        this.roleDB = new RoleDatabase();
        this.userSV = new UserService(this.userDB, this.roleDB);

        this.testUser = {
            firstName: 'testFirst',
            lastName: 'testLast',
            cpr: '4442220000',
            username: 'testUser',
            password: 'testPass',
        };
    });

    describe('Register users', function () {
        it('register a new user', async function () {
            const sb = sinon.stub(this.userDB, 'create');

            const test = await this.userSV.createUser(this.testUser);

            chai.expect(test).to.be.undefined;

            sb.restore();
        });

        it('register an already existing user', async function () {
            const sb = sinon.stub(this.userDB, 'create');
            sb.throws(
                new Error(`Duplicate entry of CPR '${this.testUser.cpr}'`)
            );

            await chai
                .expect(this.userSV.createUser(this.testUser))
                .to.be.eventually.rejectedWith(Error);

            sb.restore();
        });
    });

    describe('Login users', function () {
        beforeEach(function () {
            this.testUserDB = {
                id: '10e3bd61-890e-4ef0-aeea-caaf77d80b18',
                firstName: this.testUser.firstName,
                lastName: this.testUser.lastName,
                cpr: this.testUser.cpr,
                username: this.testUser.username,
                password_hash: bcrypt.hashSync(this.testUser.password, 10),
            };
        });

        it('login with correct cpr credentials', async function () {
            const sbFind = sinon.stub(this.userDB, 'find');
            sbFind
                .withArgs(undefined, this.testUser.cpr)
                .returns(Promise.resolve(this.testUserDB));

            const sbAccessRights = sinon.stub(this.roleDB, 'getAccessRights');
            sbAccessRights
                .withArgs(this.testUserDB.id)
                .returns(
                    Promise.resolve([
                        'basic-access:read',
                        'medicine-info:write',
                    ])
                );

            const tokens = await this.userSV.login({
                password: this.testUser.password,
                cpr: this.testUser.cpr,
            });

            chai.expect(tokens).to.have.property('accessToken');
            chai.expect(tokens).to.have.property('refreshToken');

            sbFind.restore();
        });

        it('login with incorrect cpr credentials', async function () {
            const sbFind = sinon.stub(this.userDB, 'find');
            sbFind
                .withArgs(undefined, this.testUser.cpr)
                .returns(Promise.resolve(this.testUserDB));

            const sbAccessRights = sinon.stub(this.roleDB, 'getAccessRights');
            sbAccessRights
                .withArgs(this.testUserDB.id)
                .returns(
                    Promise.resolve([
                        'basic-access:read',
                        'medicine-info:write',
                    ])
                );

            const tokens = await this.userSV.login({
                password: 'incorrectpassword',
                cpr: this.testUser.cpr,
            });

            chai.expect(tokens).to.be.null;

            sbFind.restore();
        });

        it('login with correct username credentials', async function () {
            const sbFind = sinon.stub(this.userDB, 'find');
            sbFind
                .withArgs(this.testUser.username, undefined)
                .returns(Promise.resolve(this.testUserDB));

            const sbAccessRights = sinon.stub(this.roleDB, 'getAccessRights');
            sbAccessRights
                .withArgs(this.testUserDB.id)
                .returns(
                    Promise.resolve([
                        'basic-access:read',
                        'medicine-info:write',
                    ])
                );

            const tokens = await this.userSV.login({
                username: this.testUser.username,
                password: this.testUser.password,
            });

            chai.expect(tokens).to.have.property('accessToken');
            chai.expect(tokens).to.have.property('refreshToken');

            sbFind.restore();
            sbAccessRights.restore();
        });

        it('login with incorrect username credentials', async function () {
            const sbFind = sinon.stub(this.userDB, 'find');
            sbFind
                .withArgs(this.testUser.username, undefined)
                .returns(Promise.resolve(this.testUserDB));

            const sbAccessRights = sinon.stub(this.roleDB, 'getAccessRights');
            sbAccessRights
                .withArgs(this.testUserDB.id)
                .returns(
                    Promise.resolve([
                        'basic-access:read',
                        'medicine-info:write',
                    ])
                );

            const tokens = await this.userSV.login({
                username: this.testUser.username,
                password: 'incorrectpassword',
            });

            chai.expect(tokens).to.be.null;

            sbFind.restore();
            sbAccessRights.restore();
        });
    });

    describe('Refresh tokens', async function () {
        it('An expired access token gives a new one that is verfied', async function () {
            const accessToken = jwt.sign(
                {
                    firstName: this.testUser.firstName,
                    lastName: this.testUser.lastName,
                    username: this.testUser.username,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '-1s',
                }
            );

            const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            const newAccessToken = await this.userSV.refresh({
                accessToken,
                refreshToken,
            });

            chai.expect(() =>
                jwt.verify(newAccessToken, process.env.JWT_SECRET)
            ).to.not.throw();
        });

        it('An expired refresh token results in an TokenExpiredError', async function () {
            const accessToken = jwt.sign(
                {
                    firstName: this.testUser.firstName,
                    lastName: this.testUser.lastName,
                    username: this.testUser.username,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '-1s',
                }
            );

            const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
                expiresIn: '-1s',
            });

            await chai
                .expect(this.userSV.refresh({ accessToken, refreshToken }))
                .to.be.eventually.rejectedWith(TokenExpiredError);
        });

        it('Invalid access token gives a JsonWebTokenError', async function () {
            const accessToken = jwt.sign(
                {
                    firstName: this.testUser.firstName,
                    lastName: this.testUser.lastName,
                    username: this.testUser.username,
                },
                'not-the-correct-secret-key',
                {
                    expiresIn: '5s',
                }
            );

            const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
                expiresIn: '5s',
            });

            await chai
                .expect(this.userSV.refresh(accessToken, refreshToken))
                .to.be.eventually.rejectedWith(JsonWebTokenError);
        });
    });
});
