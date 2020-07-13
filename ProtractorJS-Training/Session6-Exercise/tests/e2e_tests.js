let CustomerDTO = require('../dto/CustomerDTO');
let HomePage = require('../pages/HomePage');
let ManagerPage = require('../pages/ManagerPage');
let AddCustomerPage = require('../pages/AddCustomerPage');
let OpenAccountPage = require('../pages/OpenAccountPage');
let CustomersPage = require('../pages/CustomersPage');
let option = require('../utilities/enums');
let alertMessage = require('../utilities/browser_utils');


/**
 * End-to-end Test
 */
describe('End-to-end Test', () => {
    beforeEach( () => {
        this.customerDTO = new CustomerDTO('Clarissa','Ortiaga','1106');
    });

    it('Test Case #1', async () => {
        //1) Navigate to manager page
        let homePage = new HomePage();
        await homePage.open('http://www.way2automation.com/angularjs-protractor/banking/#/login');
        await homePage.clickManagerBtnLogin();
        let managerPage = new ManagerPage();

        //2) Verify the add customer, open account and customers button
        expect(await managerPage.addCustomerBtnIsPresent()).toBe(true);
        expect(await managerPage.addOpenAccountBtnIsPresent()).toBe(true);
        expect(await managerPage.customersBtnIsPresent()).toBe(true);

        //fail-safe - check if user exists and delete
        await managerPage.clickCustomersBtn();
        let customersPage = new CustomersPage();
        await customersPage.searchForCustomer(this.customerDTO.firstname);
        await customersPage.deleteSearchResults();        

        //3) Navigate to Add customer page via add customer button
        await managerPage.clickAddCustomerBtn();
        let addCustomerPage = new AddCustomerPage();
        
        //4) Verify firstname, lastname, postcode and addcustomer button are enabled.
        expect(await addCustomerPage.firstNameIsEnabled()).toBe(true);
        expect(await addCustomerPage.lastNameIsEnabled()).toBe(true);
        expect(await addCustomerPage.postCodeIsEnabled()).toBe(true);
        expect(await addCustomerPage.addCustomerFormBtnIsEnabled()).toBe(true);
        
        //5) Add new customer
        await addCustomerPage.enterFirstName(this.customerDTO.firstname);
        await addCustomerPage.enterLastName(this.customerDTO.lastname);
        await addCustomerPage.enterPostCode(this.customerDTO.postcode);
        await addCustomerPage.clickAddCustomerFormBtn();

        //6) Verify alert message is displayed
        expect(await alertMessage(5000)).toContain('Customer added successfully');

        // 7) Navigate to Customers page via customers button
        await managerPage.clickCustomersBtn();

        // 8) Search for the created customer on the list
        await customersPage.searchForCustomer(this.customerDTO.firstname);

        // 9) Verify that there is no account number for the newly created customer
        expect(await customersPage.getAccountNumber(this.customerDTO.firstname)).toEqual('');

        // 10) Navigate to Open account page via open account button
        await managerPage.clickOpenAccountBtn();

        // 11) Verify the customers, currency and process button are enabled 
        let openAccountPage = new OpenAccountPage();
        expect(await openAccountPage.isCustomerSelectionEnabled()).toBe(true);
        expect(await openAccountPage.isCurrencySelectionEnabled()).toBe(true);
        expect(await openAccountPage.isProcessBtnEnabled()).toBe(true);

        // 12) Select the newly created customer in the list
        await openAccountPage.selectCustomerByText(this.customerDTO.fullname());

        // 13) Select random currency in the list
        await openAccountPage.selectCurrencyByIndex(option.RANDOM);

        // 14) Process the account
        await openAccountPage.clickProcessBtn();

        // 15) Verify alert message is displayed
        expect(await alertMessage(8000)).toContain('Account created successfully');
        //await browser.sleep(3000);

        // 16) Navigate to Customers page via customers button
        await managerPage.clickCustomersBtn();

        // 17) Search for the created customer on the list
        await customersPage.searchForCustomer(this.customerDTO.firstname);

        // 18) Verify the account number is present for the newly created customer
        expect (Number(await customersPage.getAccountNumber(this.customerDTO.firstname))).not.toBeNaN();

        // 19) Delete the account
        await customersPage.searchForCustomer(this.customerDTO.firstname);
        await customersPage.deleteSearchResults();
    });
});