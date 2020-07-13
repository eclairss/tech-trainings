var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('angularjs homepage', function() {
  it('should greet the named user', function() {
    browser.get('http://www.angularjs.org');
    browser.driver.manage().window().maximize();

    element(by.model('yourName')).sendKeys('Julie');

    expect(element(by.binding('yourName')).getText()).to.eventually.equal('Hello Julie!');
 });
});

describe('angularjs homepage async-await', function() {
  it('should greet the named user async', async function() {
    await browser.get('http://www.angularjs.org');
    await browser.driver.manage().window().maximize();

    await element(by.model('yourName')).sendKeys('Julie');
    var greeting = await element(by.binding('yourName')).getText();

    await expect(greeting).to.equal('Hello Julie!');
 });
});

describe('angularjs homepage async-await expect', function() {
  it('should greet the named user await expect', async function() {
    browser.get('http://www.angularjs.org');
    browser.driver.manage().window().maximize();

    element(by.model('yourName')).sendKeys('Julie');

    var greeting = await element(by.binding('yourName')).getText();

    expect(await element(by.binding('yourName')).getText()).to.equal('Hello Julie!');
  });
});

describe('angularjs homepage promise chaining', function() {
  it('should greet the named user promise chained', function() {
    browser.get('http://www.angularjs.org')
    .then(() => browser.driver.manage().window().maximize())
    .then(() => element(by.model('yourName')).sendKeys('Julie'))
    .then(() => element(by.binding('yourName')).getText())
    .then(greeting => expect(greeting).to.equal('Hello Julie!'));
 });
});

describe('angularjs homepage expect promise', function() {
  it('should greet the named user expect promise', function() {
    browser.get('http://www.angularjs.org')
    browser.driver.manage().window().maximize();
    element(by.model('yourName')).sendKeys('Julie')
    element(by.binding('yourName')).getText().then(greeting => expect(greeting).to.equal('Hello Julie!'));
 });
});
