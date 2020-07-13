/**
 * DO NOT CHANGE ANYTHING ON THIS FILE!
 */
const login = () => {
    let username = element(by.css('input[name="username"]'));
    let password = element(by.name('password'));
    let loginButton = element(by.css('button[type="submit"]'));

    username.sendKeys('admin');
    password.sendKeys('admin');
    loginButton.click();

    browser.wait(protractor.ExpectedConditions.alertIsPresent(), 5000).then(browser.switchTo().alert().accept());
}

module.exports = login;