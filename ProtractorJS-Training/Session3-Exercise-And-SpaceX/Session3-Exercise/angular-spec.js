let login = require('./spec-util');

/**
 * Supply the necessary locator for each test.
 * 
 * Do not change the logic of the code.
 * 
 * Expected:    All tests should pass.
 * Actual:      All tests fail due to it not having its locators specified.
 */
describe('angular specific locators', function() {
    beforeEach(function() {
        browser.manage().window().maximize();
        browser.get('http://localhost:4200/login');
    });

    it('should verify that element via buttonText is displayed', function() {
        let loginButton = element(by.buttonText('Login'));
        expect(loginButton.isDisplayed()).toEqual(true);
    });

    it('should verify that element via partialButtonText is displayed', function() {
        let loginButton = element(by.partialButtonText('Log'));
        expect(loginButton.isDisplayed()).toEqual(true);
    });

    it('should verify that element via cssContainingText is displayed', function() {
        login();
        let pendingText = element(by.cssContainingText('.launch-status','Pending'));
        expect(pendingText.isDisplayed()).toEqual(true);
    });
});