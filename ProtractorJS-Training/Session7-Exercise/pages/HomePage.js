class HomePage { 
    constructor ()
    {
        this.managerLoginBtn = element(by.buttonText('Bank Manager Login'));
    }

    open = async (url) => {
        await browser.get(url);
    }

    clickManagerBtnLogin = async () => {
        await this.managerLoginBtn.click();
    }
}

module.exports = HomePage;