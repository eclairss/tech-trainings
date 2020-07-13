let alertMessage = async (timeout) => {
    let ec = protractor.ExpectedConditions;
    let message = await browser.wait(ec.alertIsPresent(), timeout).then( async (isAlertPresent) => {


        if(isAlertPresent)
            {
                let alert = await browser.switchTo().alert();
                let message = await alert.getText();
                await alert.dismiss();
                await browser.wait(ec.not(ec.alertIsPresent()), timeout);
                return (message);
            }
        return isAlertPresent;
    });

    return message;
} 

  module.exports = alertMessage;