class LoginPage {
    constructor() {
        this.emailFld = $(`[placeholder='Email'`);
        this.passwordFld = $(`[placeholder='Password']`);
        this.loginBtn = element(by.buttonText('Login'));
        this.errors = $$('form div.text-danger');
    }

    enterEmail = async(email) => {
        await this.emailFld.clear();
        await this.emailFld.sendKeys(email);
    }

    enterPassword = async(password) => {
        await this.passwordFld.clear();
        await this.passwordFld.sendKeys(password);
    }

    clickLogin = async() => {
        await this.loginBtn.click();
    }

    isLoginBtnEnabled = async() => {
        return (await this.loginBtn).isEnabled();
    }

    isErrorPresent = async(msg) => {
        let match = await this.errors.filter( async(error)=>{
            return error.getText().then( (content) => {
                return content.indexOf(msg) !== -1;
            });
        });

        if (match.length>0)
            return await match[0].isDisplayed();
        else
            return false;
    }

}

module.exports = LoginPage;