const Register = require('./Register.page.js');

const register = new Register();

describe('Registration Page', function () {
  const validEmail = 'valid@email.com';
  const validPassword = 'aslkdfas;lkdjf';

  beforeEach(function () {
    browser.url('./register.html');
  });

  it('should look nice', function () {
    let results = browser.checkDocument();

    results.forEach(function (result) {
      expect(result.isWithinMisMatchTolerance).to.be.true;
    });
  })

  it('should let you register with valid credentials', function () {
    register.register(validEmail, validPassword);

    expect(register.isRegistered()).to.be.true;

    let results = browser.checkDocument();

    results.forEach(function (result) {
      expect(result.isWithinMisMatchTolerance).to.be.true;
    });
  })

  it('should error on invalid email', function () {
    register.register('invalid', validPassword);

    expect(register.isRegistered()).to.be.false;

    let results = browser.checkDocument();

    results.forEach(function (result) {
      expect(result.isWithinMisMatchTolerance).to.be.true;
    });
  });

  it('should error on a missing password', function () {
    register.register(validEmail, '');

    expect(register.isRegistered()).to.be.false;

    let results = browser.checkDocument();

    results.forEach(function (result) {
      expect(result.isWithinMisMatchTolerance).to.be.true;
    });
  });

  it('should error on a mismatched password', function () {
    register.register(validEmail, validPassword, 'bbbbbb');

    expect(register.isRegistered()).to.be.false;

    let results = browser.checkDocument();

    results.forEach(function (result) {
      expect(result.isWithinMisMatchTolerance).to.be.true;
    });
  });

  it('should error on too short of a password', function () {
    register.register(validEmail, 'aaa');

    expect(register.isRegistered()).to.be.false;

    let results = browser.checkDocument();

    results.forEach(function (result) {
      expect(result.isWithinMisMatchTolerance).to.be.true;
    });
  });

  it('should have a link to the homepage', function () {
    register.signinLink.click();

    expect(browser.getUrl()).to.contain('index.html')
  });
})