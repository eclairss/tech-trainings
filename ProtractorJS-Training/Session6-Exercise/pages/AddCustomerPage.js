class AddCustomerPage {
    constructor()
    {
        this.firstName = element(by.xpath("//input[@placeholder='First Name']"));
        this.lastName = element(by.xpath("//input[@placeholder='Last Name']"));
        this.postCode = element(by.xpath("//input[@placeholder='Post Code']"));
        this.addCustomerFormBtn = element(by.xpath("//form/button[@type='submit']"));
    }

    firstNameIsEnabled = async () => {
        return await this.firstName.isEnabled();
    }

    lastNameIsEnabled = async () => {
        return await this.lastName.isEnabled();
    }

    postCodeIsEnabled = async () => {
        return await this.postCode.isEnabled();
    }

    addCustomerFormBtnIsEnabled = async () => {
        return await this.addCustomerFormBtn.isEnabled();
    }

    isAlertPresent = async () => {
        return false;
    }

    enterFirstName = async (firstNameStr) => {
        await this.firstName.sendKeys(firstNameStr);
    }

    enterLastName = async (lastNameStr) => {
        await this.lastName.sendKeys(lastNameStr);
    }

    enterPostCode = async (postCodeStr) => {
        await this.postCode.sendKeys(postCodeStr);
    }

    clickAddCustomerFormBtn = async () => {
        await this.addCustomerFormBtn.click();
    }
}

module.exports = AddCustomerPage;