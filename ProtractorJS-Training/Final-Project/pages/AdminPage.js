const { $, $$ } = require('protractor');

const GetLinkByIndex = require('../utilities/helpers').GetLinkByIndex;

class AdminPage {
    constructor() {
        this.dp_maintainModule = element(by.xpath(`//label[.='Maintain Module']/following-sibling::select`));
        this.section_viewBranches = {
            btn_addBranch: element(by.partialButtonText('Add Branch')),
            fld_searchBranch: $('#txtSearchBranch'),
            dp_itemsPerPage: $(`[name='itemsPerPage']`),
            cards_branches: $$('.branch-card>div:nth-child(2)>a:first-child'),
            links_pagination: $$('ul.ngx-pagination>li'),
            fn_getBranchCountInPage: async() => {return (await this.section_viewBranches.cards_branches).length },
            fn_openBranchByIndex: async(index) => {
                let selected = await GetLinkByIndex(index, await this.section_viewBranches.cards_branches);
                let property = {text: await selected.getText(), href: await selected.getAttribute("href")};
                await selected.click();
                return property;
            }
        },
        this.section_editBranch = {
            container: $('app-branch-edit'),
            elem_heading: $('app-branch-edit>h4'),
            fld_name: $(`[placeholder='Branch name']`),
            fld_address: $(`[formcontrolname='address']`),
            links_cinema: $$('app-cinema-list a'),
            btn_addCinema: element(by.partialButtonText('Add Cinema')),
            btn_viewSchedule: element(by.partialButtonText('View Schedule')),
            fn_clickViewSchedule: async() => { await this.section_editBranch.btn_viewSchedule.click() },
            fn_isCinemaPresent: async(name) => { 
                return (await this.section_editBranch.container
                    .element(
                        by.xpath(`//app-cinema-list/ul/li/a[normalize-space(.)='${name}']`))
                    ).isPresent() 
            },
            fn_getCinemaCount: async() => { return (await this.section_editBranch.links_cinema).length },
            fn_openCinemaByIndex: async(index) => {
                let selected = await GetLinkByIndex(index, await this.section_editBranch.links_cinema);
                let property = {"text": await selected.getText(), "href": await selected.getAttribute("href")};
                await selected.click();
                return property;
            },
            fn_getHeadingText: async() => {return (await this.section_editBranch.elem_heading).getText()},
            fn_openCinemaByText: async(name) => {
                (await this.section_editBranch.container
                .all(by.xpath(`//app-cinema-list/ul/li/a[normalize-space(.)='${name}']`)))[0]
                .click()
            },
            fn_clickAddCinema: async() => {await this.section_editBranch.btn_addCinema.click()}
        },
        this.section_addBranch = {
            fld_name: $(`[placeholder='Branch name']`),
            fld_address: $(`[formcontrolname='address']`),
            btn_add: element(by.buttonText('Add'))
        },
        this.section_addCinema = {
            btn_add: element(by.buttonText('Add')),
            fld_name: $(`[placeholder='Cinema name']`),
            fld_branch: element(by.xpath(`//label[.='Branch']/following-sibling::div/input`)),
            link_backToList: element(by.partialLinkText('Back to list')),
                       fn_enterCinema: async(name) => {
                await this.section_addCinema.fld_name.clear();
                await this.section_addCinema.fld_name.sendKeys(name);
            },
            fn_clickAdd: async() => {await this.section_addCinema.btn_add.click()}
        },
        this.section_editCinema = {
            container: $('app-cinema-edit'),
            btn_update: element(by.buttonText('Update')),
            fld_name: $(`[placeholder='Cinema name']`),
            fld_rows: $(`[name='rows']`),
            fld_columns: $(`[name='columns']`),
            elems_seats: $$('.seat-plan app-seat'),
            elems_disabledSeats: $$('.seat-plan div.disabled'),
            link_backToList: element(by.partialLinkText('Back to list')),
            fn_clickUpdate: async() => {await this.section_editCinema.btn_update.click()},
            fn_getDisabledSeatsCount: async() => {
                return (await this.section_editCinema.elems_disabledSeats).length
            },
            fn_isSeatDisabled: async(seatNo) => {
                let seat = await this.section_editCinema.container.element(by.xpath(`//div[.='${seatNo}']`));
                return (await seat.getAttribute('class')).indexOf('disabled') !== -1
            },
            fn_clickBackToList: async() => {
                await this.section_editCinema.link_backToList.click();
            }
        },
        this.section_viewSchedules = {
            container: $('app-schedule-list'),
            btn_addMovieSchedule: element(by.partialButtonText('Add Movie Schedule')),
            item_currentPage: $('ul.ngx-pagination>li.current'),
            item_nextPage: $('ul.ngx-pagination>li.pagination-next'),
            list_pagination: $$('ul.ngx-pagination>li'),
            dp_cinema: $(`select[name='cinema']`),
            cards_schedule: $$('app-schedule-card > div.schedule-card'),
            fn_clickAddMovieSchedule: async() => {await this.section_viewSchedules.btn_addMovieSchedule.click()},
            fn_selectCinemaByText: async(text) => {await this.section_viewSchedules.dp_cinema.sendKeys(text)},
            fn_getScheduleCount: async() => {
                return (await this.section_viewSchedules.cards_schedule).length;
            },
            fn_isThisPagePresent: async() => {
                return (await this.section_viewSchedules.container).isPresent();
            },
            fn_getAllMovieDateMatch: async() => {
                let schedules = [];
                let pagesize = (await $$('ul.ngx-pagination>li')).length;
                //await expect(pagesize).toBe(0,'Page size');

                for(let i=2; i < pagesize; i++){

                    for await(let card of await this.section_viewSchedules.cards_schedule){
                        let datetime = await (await card.$('p')).getText();

                        let schedule = {
                            movie: await card.$('h6').getText(), //assign to movie
                            datetime: new Date(await datetime)
                        };

                        schedules.push(schedule);
                    }

                    
                    await (await this.section_viewSchedules.item_nextPage).click();
                }

                return schedules;
            }

        },
        this.section_addSchedule = {
            dp_cinema: $(`select[name='cinema']`),
            dp_movie: $(`select[name='movie']`),
            fld_startDate: $(`[name='startDate']`), //TODO
            fld_startTimeHour: $(`[aria-label='Hours']`), //TODO
            fld_startTimeMinute: $(`[aria-label='Minutes']`), //TODO
            fld_ticketPrice: $(`[name='ticketPrice']`),
            btn_add: element(by.buttonText('Add')),
            fn_clickAdd: async() => {
                await this.section_addSchedule.btn_add.click();
            },
            fn_clickCinema: async() => {await this.section_addSchedule.dp_cinema.click()},
            fn_isCinemaPresent: async(name) => {
                let option = await this.section_addSchedule.dp_cinema.element(by.xpath(`//option[normalize-space(.)='${name}']`));
                return await option.isPresent();
            },
            fn_selectCinemaByText: async(cinema) => {
                await this.section_addSchedule.dp_cinema.sendKeys(cinema)
            },
            fn_selectMovieByText: async(movie) => {
                await this.section_addSchedule.dp_movie.sendKeys(movie)
            },
            fn_enterStartDate: async(date) => {
                await this.section_addSchedule.fld_startDate.clear();
                await this.section_addSchedule.fld_startDate.sendKeys(date);
            },
            fn_setHours: async(hours) => {
                await this.section_addSchedule.fld_startTimeHour.click();
                let action = await browser.actions();
                for (let i=0; i<hours; i++){
                    await action.sendKeys(protractor.Key.ARROW_UP);
                }
                await action.perform();
            },
            fn_setMinutes: async(minutes) => {
                await this.section_addSchedule.fld_startTimeMinute.click();
                let action = await browser.actions();
                for (let i=0; i<minutes; i++){
                    await action.sendKeys(protractor.Key.ARROW_UP);
                }
                await action.perform();
            },
            fn_enterPrice: async(price) => {
                await this.section_addSchedule.fld_ticketPrice.clear();
                await this.section_addSchedule.fld_ticketPrice.sendKeys(price)
            }
        }
        this.section_viewPaymentTransactions = {
            container: $('app-payment-list'),
            fld_transactionDate: $(`input[name='transactionDate']`),
            dp_itemsPerPage: $(`select[name='itemsPerPage']`),
            rows_transactions: $$(`app-payment-list table>tbody>tr`),
            item_nextPage: $('ul.ngx-pagination>li.pagination-next'),
            fn_setTransactionDateFilter: async(date) => {
                await this.section_viewPaymentTransactions.fld_transactionDate.clear();
                await this.section_viewPaymentTransactions.fld_transactionDate.sendKeys(date);                         
                await browser.actions().sendKeys(protractor.Key.ENTER).perform();//to trigger send of request       
                await this.section_viewPaymentTransactions.dp_itemsPerPage.sendKeys('20'); //make it faster so max number of rows in page
            }
        }
        this.section_viewPaymentDetails = {
            container: $('app-payment-detail'),
            link_backToList: element(by.partialLinkText('Back to list')),
            fn_getDisplayedPaymentDetails: async() => {
                let details = await $$('app-payment-detail .form-group > span');
                let description = (await (await details[2]).getText()).split(' | ');

                return {
                    user: {
                           email: await details[1].getText(),
                           fullname: await details[3].getText(),
                    },
                    description: this.processDescription(await description),
                    totalPrice: Number.parseFloat(await details[4].getText())
                }
            },
            fn_clickBackToList: async() => {
                await this.section_viewPaymentDetails.link_backToList.click();
            }
        }
    }

    getPaymentTransactionsDetails = async(date) => {
        let pagesize = (await $$('ul.ngx-pagination>li')).length;
        let payments = [];

        
        await this.section_viewPaymentTransactions.fn_setTransactionDateFilter(date);

        for(let i=2; i < pagesize; i++){ 
            let rows = await $$(`app-payment-list table>tbody>tr`);
            for (let count = 0; count < rows.length; count++){
                let row = await $$(`app-payment-list table>tbody>tr`).get(count);
                let rowLink = await row.$('td.transaction-date > a');
                
                let description = (await (await row.$('td.description')).getText()).split(' | ');
                let floatTotalPrice = Number.parseFloat(await row.$('td.amount').getText());

                await rowLink.click();

                let paymentDetails = await this.section_viewPaymentDetails.fn_getDisplayedPaymentDetails();

                let data = {
                    list: {
                        description: this.processDescription(await description),
                        totalPrice: floatTotalPrice
                    },
                    detail: paymentDetails
                }

                payments.push(data);     

                await this.section_viewPaymentDetails.fn_clickBackToList();           
                await this.section_viewPaymentTransactions.fn_setTransactionDateFilter(date);
            }

            await (await this.section_viewPaymentTransactions.item_nextPage).click();
        }

        return payments;
    }

    //to process description to json
    processDescription = (description) =>{

        return {
            movie: description[0],
            branch: description[1],
            cinema: description[2],
            date: new Date(description[3]),
            seats: description[4].split(', ')
        };
    }

    selectModuleByText = async(text) => {
        await this.dp_maintainModule.sendKeys(text);
    }

    addBranch = async(name,address) => {
        await this.section_viewBranches.btn_addBranch.click();
        //clear fields
        await this.section_addBranch.fld_name.clear();
        await this.section_addBranch.fld_address.clear();

        await this.section_addBranch.fld_name.sendKeys(name);
        await this.section_addBranch.fld_address.sendKeys(address);
        await this.section_addBranch.btn_add.click();
    }

    createSeatMap = async(row,column) => {
        //cleanup field
        await this.section_editCinema.fld_rows.clear();
        await this.section_editCinema.fld_columns.clear();

        await this.section_editCinema.fld_rows.sendKeys(row);
        await this.section_editCinema.fld_columns.sendKeys(column);
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();//to trigger send of request
    }

    disableSeats = async(list) => {
        for await(let seatNo of list){
            let seat = await this.section_editCinema.container.element(by.xpath(`//app-seat[.='${seatNo}']`)); //freakin faster than css!!
            if((await seat.getAttribute('class')).indexOf('disabled') === -1){ //if not disabled, click
                await seat.click();
            }
        }
    }

    addCinema = async(name) => {
        await this.section_editBranch.btn_addCinema.click();
        await this.section_addCinema.fld_name.clear();
        await this.section_addCinema.fld_name.sendKeys(name);
        await this.section_addCinema.btn_add.click();
    }

    addSchedule = async(dto) => {
        await this.section_viewSchedules.dp_cinema.sendKeys(dto.cinema);
        await this.send
    }
}

module.exports = AdminPage;