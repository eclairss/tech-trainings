const WaitForElement = require('../utilities/helpers').WaitForElement;

class PaymentPage {
    constructor() {
        this.btn_proceed = $('button.btn-proceed');
        this.fld_cardHolderName = $(`input[formcontrolname='cardholderName']`);
        this.fld_creditCardNumber = $(`[formcontrolname='cardNumber']>input`);
        this.fld_cvv = $(`[formcontrolname='cvv']>input`);
        this.fld_expiryDate = $(`[formcontrolname='expiryDate']>input`); //mm/yy format
        this.section_paymentSummary = {
            header: $('app-payment-summary>div>h2'),
            description: $('app-payment-summary > div > :nth-child(2) > :nth-child(2)'),
            totalAmount: $('app-payment-summary > div > :nth-child(3) > :nth-child(2)')
        }
        this.dialogBox = {
            timeout: 22000,
            container: $(`p-dialog > [role='dialog']`),
            header: $(`p-dialog > [role='dialog'] > .ui-dialog-titlebar`),
            content: $(`p-dialog > [role='dialog'] > .ui-dialog-content`),
            footer: $(`p-dialog > [role='dialog'] > .ui-dialog-footer`),
            btn_close: $(`p-dialog > [role='dialog'] > .ui-dialog-footer button`),
            fn_getConfirmationMsg: async() => {
                await WaitForElement(element(by.buttonText('Close')),this.dialogBox.timeout);
                let msg = await this.dialogBox.content.$('div > div > p');
                return await msg.getText();
            },
            fn_getConfirmedReservationDetails: async() => {
                await WaitForElement(element(by.buttonText('Close')),this.dialogBox.timeout);
                let elem_movie = await this.dialogBox.content.$('app-reservation-summary>div.summary>div:nth-child(1)');
                let elem_branch = await this.dialogBox.content.$('app-reservation-summary>div.summary>div:nth-child(2)');
                let elem_cinema = await this.dialogBox.content.$('app-reservation-summary>div.summary>div:nth-child(3)');
                let elem_date = await this.dialogBox.content.$('app-reservation-summary>div.summary>div:nth-child(4)');
                let elem_time = await this.dialogBox.content.$('app-reservation-summary>div.summary>div:nth-child(5)');
                let elem_seats = await this.dialogBox.content.$('app-reservation-summary>div.summary>div:nth-child(6)');
                let elem_numSeats = await this.dialogBox.content.$('app-reservation-summary>div.summary>div:nth-child(7)');
                let elem_price = await this.dialogBox.content.$('app-reservation-summary>div.summary>div:nth-child(8)');
                let elem_total = await this.dialogBox.content.$('app-reservation-summary>div.summary>div:nth-child(9)');

                let date = (await (await elem_date).getText()).replace('Screening Date: ','');
                let time = (await (await elem_time).getText()).replace('Screening Time: ','');

                let ticketSummary = {
                    movie: (await (await elem_movie).getText()).replace('Movie Title: ',''),
                    branch: (await (await elem_branch).getText()).replace('Branch: ',''),
                    cinema: (await (await elem_cinema).getText()).replace('Cinema: ',''),
                    datetime: new Date(date + ' ' + time),
                    seats: (await (await elem_seats).getText()).replace('Selected Seats: ','').split(', '),
                    numSeats: Number.parseInt((await (await elem_numSeats).getText()).replace('No. of Seats: ','')),
                    price: Number.parseFloat((await (await elem_price).getText()).replace('Ticket Price: ','')),
                    total: Number.parseFloat((await (await elem_total).getText()).replace('Total: ',''))                    
                }

                return ticketSummary;
            },
            fn_closeDialogBox: async() => {
                await WaitForElement(element(by.buttonText('Close')),this.dialogBox.timeout);
                await (await this.dialogBox.btn_close).click();
            }
        }
    }

    getPaymentSummaryDetails = async() => {
        let desciptionText = await (await this.section_paymentSummary.description).getText();
        let totalText = await (await this.section_paymentSummary.totalAmount).getText();
        return {
            description: await desciptionText.split(' | '),
            total: await (await totalText.split(' '))[1]
        };
    }

    enterCardholderName = async(name) => {
        await this.fld_cardHolderName.clear();
        await this.fld_cardHolderName.sendKeys(name);
    }

    enterCreditCardNo = async(ccNo) => {
        await this.fld_creditCardNumber.click();
        await this.fld_creditCardNumber.sendKeys(ccNo);
    }

    enterCVV = async(cvv) => {
        await this.fld_cvv.click();
        await this.fld_cvv.sendKeys(cvv);
    }

    enterCCExpiryDate = async(expiryDate) => {
        await this.fld_expiryDate.click();
        await this.fld_expiryDate.sendKeys(expiryDate);
    }

    clickProceed = async() => {
        await this.btn_proceed.click();
    }
}

module.exports = PaymentPage;