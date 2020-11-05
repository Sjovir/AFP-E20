import 'mocha';
import chai from 'chai';
import chaiAsPromise from 'chai-as-promised';
// import sinon from 'sinon';
import dotenv from 'dotenv';

dotenv.config();

chai.use(chaiAsPromise);

describe('Test booleans', function () {
    it('this is true', async function () {
        chai.expect(true).to.be.true;
    });

    it('this is true', async function () {
        chai.expect(false).to.be.false;
    });
});
