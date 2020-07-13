class ManagerPage { 

    constructor ()
    {
        this.addCustomerBtn = element(by.buttonText('Add Customer'));
        this.openAccountBtn = element(by.buttonText('Open Account'));
        this.customersBtn = element(by.buttonText('Customers'));
    }

    addCustomerBtnIsPresent = async () => {
        return await this.addCustomerBtn.isPresent();
    }

    addOpenAccountBtnIsPresent = async () => {
        return await this.openAccountBtn.isPresent();
    }

    customersBtnIsPresent = async () => {
        return await this.customersBtn.isPresent();
    }

    clickAddCustomerBtn = async () => {
        await this.addCustomerBtn.click();
    }

    clickOpenAccountBtn = async () => {
        await this.openAccountBtn.click();
    }

    clickCustomersBtn = async () => {
        await this.customersBtn.click();
    }
}

module.exports = ManagerPage;