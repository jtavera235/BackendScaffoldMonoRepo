var expect = require("chai").expect;

describe('This is a test function', () => {

  it('Should return true because the numbers are equal', () => {
    const result = 3 == 3;
    expect(result).to.equal(true);
  });

});