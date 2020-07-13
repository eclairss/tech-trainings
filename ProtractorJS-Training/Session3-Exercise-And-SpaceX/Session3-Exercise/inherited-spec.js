let login = require('./spec-util');

/**
 * Supply the necessary locator for each test.
 * 
 * Do not change the logic of the code.
 * 
 * Expected:    All tests should pass.
 * Actual:      All tests fail due to it not having its locators specified.
 */
describe('inherited locators', function() {
    beforeEach(function() {
        browser.manage().window().maximize();
        browser.get('http://localhost:4200/login');
    });

    it('should verify that element via className is displayed', function() {
        let spaceXLogo = element(by.className('logo'));
        expect(spaceXLogo.isDisplayed()).toEqual(true);
    });

    it('should verify that element via css is displayed', function() {
        let dashboardCss = element(by.css('a[href="/dashboard"]')); 
        expect(dashboardCss.isDisplayed()).toEqual(true);
    });

    it('should verify that element via id is displayed', function() {
        login();
        let profile = element(by.css('a[href="/user"]'));
        profile.click();
        let role = element(by.id('Role'));
        expect(role.isDisplayed()).toEqual(true);
    });

    it('should verify that name is displayed', function() {
        let username = element(by.name('username'));
        expect(username.isDisplayed()).toEqual(true);
    });

    it('should verify that tagName is displayed', function() {
        let loginButton = element(by.tagName('button'));
        expect(loginButton.isDisplayed()).toEqual(true);
    });

    it('should verify that xpath is displayed', function() {
        let dashboardXpath = element(by.xpath("//a[.='Dashboard']"));
        expect(dashboardXpath.isDisplayed()).toEqual(true);
    });

    it('should verify that element via linkText is displayed', function() {
        let dashboardLinkText = element(by.linkText('DASHBOARD'));
        expect(dashboardLinkText.isDisplayed()).toEqual(true);
    });

    it('should verify that partialLinkText is displayed', function() {
        let dashboardPartialLinkText = element(by.partialLinkText('DASH'));
        expect(dashboardPartialLinkText.isDisplayed()).toEqual(true);
    });
});