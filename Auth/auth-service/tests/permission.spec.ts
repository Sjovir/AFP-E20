import chai from 'chai';
import chaiAsPromise from 'chai-as-promised';
import dotenv from 'dotenv';
import 'mocha';
import { hasPermissions } from '../src/utils/permission-util';

dotenv.config();

chai.use(chaiAsPromise);

const userPermissions = [
  'MEDICINE_PROFILE:WRITE',
  'MEDICINE_RECIPIENTS:READ',
  'CITIZEN:WRITE',
];

describe('Permission Utility', function () {
  describe('has permissions', function () {
    it('with valid array', function () {
      const result = hasPermissions(userPermissions, [
        'MEDICINE_RECIPIENTS:READ',
        'CITIZEN:WRITE',
      ]);
      chai.expect(result).to.be.true;
    });

    it('with valid string', function () {
      const result = hasPermissions(['ADMIN', ...userPermissions], 'ADMIN');
      chai.expect(result).to.be.true;
    });

    it('with invalid array', function () {
      const result = hasPermissions(userPermissions, [
        'CITIZEN:READ',
        'MEDICINE_RECIPIENTS:WRITE',
      ]);
      chai.expect(result).to.be.false;
    });

    it('with invalid string', function () {
      const result = hasPermissions(userPermissions, 'MODERATOR');
      chai.expect(result).to.be.false;
    });
  });
});
