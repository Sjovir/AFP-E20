import chai from 'chai';
import chaiAsPromise from 'chai-as-promised';
import dotenv from 'dotenv';
import 'mocha';
import { hasPermissions } from '../src/utils/permission-util';

dotenv.config();

chai.use(chaiAsPromise);

const userPermissions = [
    'ADMIN',
    'MEDICINE_PROFILE:WRITE',
    'CITIZEN:WRITE',
    'MEDICINE_RECIPIENTS:READ',
];

describe('Permission Utility', function () {
    describe('has permissions', function () {
        it('with valid array', function () {
            const result = hasPermissions(userPermissions, [
                'ADMIN',
                'MEDICINE_RECIPIENTS:READ',
            ]);
            chai.expect(result).to.be.true;
        });

        it('with valid string', function () {
            const result = hasPermissions(userPermissions, 'ADMIN');
            chai.expect(result).to.be.true;
        });

        it('with invalid array', function () {
            const result = hasPermissions(userPermissions, [
                'ADMIN',
                'MEDICINE_RECIPIENTS:WRITE',
            ]);
            console.log(result);
            chai.expect(result).to.be.false;
        });

        it('with invalid string', function () {
            const result = hasPermissions(userPermissions, 'MODERATOR');
            chai.expect(result).to.be.false;
        });
    });
});
