const WaitForElement = require('../utilities/helpers').WaitForElement;

class ReservationPage {
    constructor() {
        this.timeout = 700;
        this.branchSelection = $(`[formcontrolname='branchId']`);
        this.cinemaSelection = $(`[formcontrolname='cinemaId']`);
        this.dateSelection = $(`[formcontrolname='watchDate']`);
        this.timeSelection = $(`[formcontrolname='scheduleId']`);
        this.seatPlan = $$('app-seat:not(.printable)');//$$('app-seat');
        this.availableSeats = $$('app-seat-plan app-seat div:not(.taken)');
        this.takenSeats = $$('app-seat-plan app-seat div.taken');
        this.confirmReservationBtn = element(by.buttonText('Confirm Reservation'));
        this.dialogBox = {
            container: $(`p-dialog[header='Ticket Summary']>div[role='dialog']`),
            titlebar: $(`p-dialog[header='Ticket Summary'] div.ui-dialog-titlebar`),
            content: $(`p-dialog[header='Ticket Summary'] div.ui-dialog-content`),
            footer: $(`p-dialog[header='Ticket Summary'] div.ui-dialog-footer`),
            title: $(`p-dialog[header='Ticket Summary'] div.ui-dialog-titlebar span.ui-dialog-title`),
            fn_getTicketSummaryDetails: async() => {
                await WaitForElement(this.dialogBox.container,8000);

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
                    numSeats: (await (await elem_numSeats).getText()).replace('No. of Seats: ',''),
                    price: Number.parseInt((await (await elem_price).getText()).replace('Ticket Price: ','')),
                    total: (await (await elem_total).getText()).replace('Total: ','')                    
                }

                return ticketSummary;
            },
            fn_getTitle: async() => {
                await WaitForElement(this.dialogBox.container,8000);
                let title = await (await this.dialogBox.title).getText();
                return title;
            },
            fn_clickFooterBtn: async(buttonText) => {
                await WaitForElement(this.dialogBox.container,8000);
                let btn = await this.dialogBox.footer.element(by.buttonText(buttonText));
                await btn.click();
                return new Date();
            }
        }
    }

    selectBranchByIndex = async (index) => {
        await this.branchSelection.click().then( async() => {
            let options = await $$('mat-option');
            await options[index].click();
        });
    }

    selectBranchByText = async (text) => { //select by visible text
        await this.branchSelection.click().then( async() => {
            await browser.sleep(this.timeout); //corrector
            await $$('mat-option').filter( (options) => {
                return options.getText().then( (content) => {
                    return content == text;
                });
            }).first().click();
        });
    }

    selectCinemaByIndex = async (index) => {
        await this.cinemaSelection.click().then( async() => {
            let options = await $$('mat-option');
            await options[index].click();
        });
    }

    selectCinemaByText = async (text) => {
        await this.cinemaSelection.click().then( async() => {
            await browser.sleep(this.timeout); //corrector
            await $$('mat-option').filter( (options) => {
                return options.getText().then( (content) => {
                    return content == text;
                });
            }).first().click();
        });
    }

    selectDateByIndex = async (index) => {
        await this.dateSelection.click().then( async() => {
            let options = await $$('mat-option');
            await options[index].click();
        });
    }

    selectDateByText = async (text) => {
        await this.dateSelection.click().then( async() => {
            await browser.sleep(this.timeout); //corrector
            await $$('mat-option').filter( (options) => {
                return options.getText().then( (content) => {
                    return content == text;
                });
            }).first().click();
        });
    }

    selectTimeByIndex = async (index) => {
        await this.timeSelection.click().then( async() => {
            let options = await $$('mat-option');
            await options[index].click();
        });
    }
    
    selectTimeByText = async (text) => {
        await this.timeSelection.click().then( async() => {
            await browser.sleep(this.timeout); //corrector
            await $$('mat-option').filter( (options) => {
                return options.getText().then( (content) => {
                    return content == text;
                });
            }).first().click();
        });
    }

    selectSeatByIndex = async(index) => {
        await this.seatPlan[index].click();
    }

    selectSeatByText = async(text) => {
            await this.seatPlan.filter( (seat) => {
                return seat.getText().then( (content) => {
                    return content == text;
                });
            }).first().click();
    }

    selectRandomSeats = async(count) => {
        let seats = [];
        for(let i=0; i<count; i++){
            let seat = (await this.availableSeats)[i];
            seats.push(await seat.getText());
            await seat.click();
        }
        return seats;
    }

    getTakenSeats = async() => {
        let seats = [];
        for (let seat of await this.takenSeats){
            seats.push(await seat.getText());
        }
        return seats;
    }

    clickConfirmReservationBtn = async() => {
        this.confirmReservationBtn.click();
    }
}

module.exports = ReservationPage;