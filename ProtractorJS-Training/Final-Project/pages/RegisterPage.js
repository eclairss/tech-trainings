class RegisterPage {
    constructor() {
        this.emailFld = $(`[placeholder='Email']`);
        this.passwordFld = $(`[placeholder='Password']`);
        this.firstNameFld = $(`[formcontrolname='firstName']`);
        this.middleNameFld = $(`[formcontrolname='middleName']`);
        this.lastNameFld = $(`[formcontrolname='lastName']`);
        this.birthdayFld = $(`[formcontrolname='birthDay']`);;
        this.registerBtn = element(by.buttonText('Register'));
    }

    enterEmail = async (email) => {
        await this.emailFld.clear();
        await this.emailFld.sendKeys(email);
    }

    enterPassword = async (password) => {
        await this.passwordFld.clear();
        await this.passwordFld.sendKeys(password);
    }

    enterFirstName = async (firstname) => {
        await this.firstNameFld.clear();
        await this.firstNameFld.sendKeys(firstname);
    }

    enterMiddleName = async (middlename) => {
        await this.middleNameFld.clear();
        await this.middleNameFld.sendKeys(middlename);
    }

    enterLastName = async (lastname) => {
        await this.lastNameFld.clear();
        await this.lastNameFld.sendKeys(lastname);
    }

    enterBirthday = async (birthday) => {
        await this.birthdayFld.clear();
        await this.birthdayFld.sendKeys(birthday);
    }

    clickRegister = async () => {
        await this.registerBtn.click();
    }
}

module.exports = RegisterPage;