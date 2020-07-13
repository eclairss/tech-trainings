class CustomersPage {
    constructor () {
        this.searchCustomerFld = element(by.css("input[placeholder='Search Customer']"));
        this.resultBody = element(by.xpath("//tbody"));
    }

    searchForCustomer = async (name) => {
        await this.searchCustomerFld.clear();
        await this.searchCustomerFld.sendKeys(name);
    }

    deleteSearchResults = async () => {
        //await this.resultBody.$$('tr').get(0).element(by.buttonText('Delete')).click();
        //await this.searchResults.get(0).element(by.buttonText('Delete')).click();
        (await this.resultBody.$$('tr')).forEach( async (row) => {
            await row.element(by.buttonText('Delete')).click();
        });
    }

    resultCount = async (name) => {
        await this.searchForCustomer(name);
        return (await this.resultBody.$$('tr')).length;
    }

    getAccountNumber = async (name) =>{
        await this.searchForCustomer(name);
        return (await element(by.xpath("//tbody")).$$('tr').get(0).$$('td').get(3)).getText();
    }
}

module.exports = CustomersPage;