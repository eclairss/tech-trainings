describe('all exercise 5 tests', () => {
    browser.waitForAngularEnabled(false);
        const url = 'http://magenicautomation.azurewebsites.net/Automation';

        beforeEach(function() {
            //1. Go to automation site
            browser.get(url);
        });
        
        it('TC #1', () => {
            //2.Click the Javascript Alert button
            let alertWithConfirmButton = element(by.css('#javascriptConfirmAlertButton'));
            alertWithConfirmButton.click();
            //3.Switch to the Alert and click OK button​
            let alert = browser.switchTo().alert();
            alert.accept();
            //4.Verify that you are still to the correct URL​
            browser.getCurrentUrl().then(function (newUrl){
                expect(newUrl).toBe(url);
            });
        });

        it('TC #2', () => {
            //2.Click Async page link
            let asyncLink = element(by.linkText('Async page'));
            asyncLink.click();

            //3a. Wait for loading to finish
            let loading = element(by.css('#LoadingIconImage'));
            let EC = protractor.ExpectedConditions;
            let isVisible = EC.not(EC.visibilityOf(loading));
            browser.wait(isVisible, 10000);

            //3b. Verify that 'Loaded' message will be displayed​
            let loaded = element(by.xpath("//p[.='Loaded']"));
            expect(loaded.isDisplayed()).toBe(true);
        });

        it('TC #3', () => {
            //2. verify footer is displayed
            let footer = element(by.xpath("//p[contains(text(),'2020 - Magenic Technologies')]"));
            expect(footer.isDisplayed()).toBe(true);

            //3. take screenshot and save to [project-path]\screenshots
           browser.executeScript("arguments[0].scrollIntoView();", footer);
           browser.takeScreenshot().then(data => {
            writeScreenshot(data, 'page.png');
           });
        });

        function writeScreenshot(data, name) {
            var fs = require('fs');
            var path = require('path');
            fs.writeFileSync(path.join(__dirname, 'screenshots\\') + name, data, 'base64');
        };
});