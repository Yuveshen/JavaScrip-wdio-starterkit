const Login = require('./login.page.js');

const login = new Login();

describe('Login Page', function () {
  const validEmail = 'valid@email.com';
  const validPassword = 'aslkdfas;lkdjf';

  beforeEach(function () {
    browser.url('./');
  });

  it('should look nice', function () {
    let results = browser.checkDocument();

    results.forEach(function (result) {
      expect(result.isWithinMisMatchTolerance).to.be.true;
    });
  })

  it('should let you log in with valid credentials', function () {
    login.login(validEmail, validPassword);

    expect(login.isLoggedIn()).to.be.true;
  })

  it('should error on an missing email', function () {
    login.login('', validPassword);

    expect(login.isLoggedIn()).to.be.false;

    let results = browser.checkDocument();

    results.forEach(function (result) {
      expect(result.isWithinMisMatchTolerance).to.be.true;
    });
  })

  it('should error on an invalid email', function () {
    login.login('invalid', validPassword);

    expect(login.isLoggedIn()).to.be.false;
  })

  it('should error on a missing password', function () {
    login.login(validEmail, '');

    expect(login.isLoggedIn()).to.be.false;

    let results = browser.checkDocument();

    results.forEach(function (result) {
      expect(result.isWithinMisMatchTolerance).to.be.true;
    });
  })

  it('should link to the registration page', function () {
    login.signupLink.click();

    expect(browser.getUrl()).to.contain('register.html')
  })
})