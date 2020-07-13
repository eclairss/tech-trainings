let option = require('../utilities/enums');

class OpenAccountPage {
    constructor ()
    {
        //this.customerSelection = $('#userSelect');
        this.customerSelection = $('#userSelect');
        this.currencySelection = $('#currency');
        this.processBtn = element(by.buttonText('Process'));
    }

    isCustomerSelectionEnabled = async () => {
        return await this.customerSelection.isEnabled();
    }

    isCurrencySelectionEnabled = async () => {
        return await this.currencySelection.isEnabled();
    }

    isProcessBtnEnabled = async () => {
        return await this.processBtn.isEnabled();
    }
    
    selectCustomerByIndex = async (index) => {
        await this.customerSelection.all(by.css('option')).then( async (options) => {
            let true_index = await this.getTrueIndex(index, options.length);
            await options[true_index].click();
       });
    }

    selectCustomerByText = async (value) => {
        await this.customerSelection.sendKeys(value);
    }

    selectCurrencyByIndex = async (index) => {
       await this.currencySelection.all(by.css('option')).then( async (options) => {
            let true_index = this.getTrueIndex(index, options.length);
            await options[true_index].click();
       });
    }

    clickProcessBtn = async () => {
        await this.processBtn.click();
    }

    getTrueIndex = (index, max) => {
        let true_index = index;
        
        if(index === option.MAX)
        {
            true_index = max - 1;
        }
        else if(index === option.RANDOM)
        {
            true_index = Math.floor(Math.random() * (max-1) + 1);
        }
        else if(index < -2)
        {
            true_index = 0;
        }

        return true_index;
    }
}
module.exports = OpenAccountPage;