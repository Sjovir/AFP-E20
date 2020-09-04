import "mocha";
import { expect } from 'chai';

describe('API', function () {
  describe('Login', function () {
    it('should return -1 when the value is not present', function () {
      const arr = [1, 2, 3];
      expect(arr.indexOf(4)).to.equal(-1);
    });
  });
});
