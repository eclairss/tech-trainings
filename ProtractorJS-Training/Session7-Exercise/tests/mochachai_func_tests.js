var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

let CustomerDTO = require('../dto/CustomerDTO');
let HomePage = require('../pages/HomePage');
let ManagerPage = require('../pages/ManagerPage');
let AddCustomerPage = require('../pages/AddCustomerPage');
let OpenAccountPage = require('../pages/OpenAccountPage');
let CustomersPage = require('../pages/CustomersPage');
let option = require('../utilities/enums');
let alertMessage = require('../utilities/browser_utils');

/**
 * Functional Test
 */
describe('Functional Test', () => {
    beforeEach( () => {
        this.homePage = new HomePage();
        this.managerPage = new ManagerPage();
        this.addCustomerPage = new AddCustomerPage();
        this.openAccountPage = new OpenAccountPage();
        this.customersPage = new CustomersPage();
    });

    it('Test Case #1', async () => {
        //1) Navigate to manager page
        await this.homePage.open('http://www.way2automation.com/angularjs-protractor/banking/#/login');
        await this.homePage.clickManagerBtnLogin();

        //2) Verify the add customer, open account and customers button
        await expect(this.managerPage.addCustomerBtnIsPresent()).to.eventually.be.true;
        await expect(this.managerPage.addOpenAccountBtnIsPresent()).to.eventually.be.true;
        await expect(this.managerPage.customersBtnIsPresent()).to.eventually.be.true;

        // //3) Navigate to Add customer page via add customer button
        await this.managerPage.clickAddCustomerBtn();
        
        // //4) Verify firstname, lastname, postcode and addcustomer button are enabled.
        await expect(this.addCustomerPage.firstNameIsEnabled()).to.eventually.be.true;
        await expect(this.addCustomerPage.lastNameIsEnabled()).to.eventually.be.true;
        await expect(this.addCustomerPage.postCodeIsEnabled()).to.eventually.be.true;
        await expect(this.addCustomerPage.addCustomerFormBtnIsEnabled()).to.eventually.be.true;
        
        // //5) Add new customer
        this.customerDTO = new CustomerDTO('Clarissa','Ortiaga','1106');
        await this.addCustomerPage.enterFirstName(this.customerDTO.firstname);
        await this.addCustomerPage.enterLastName(this.customerDTO.lastname);
        await this.addCustomerPage.enterPostCode(this.customerDTO.postcode);
        await this.addCustomerPage.clickAddCustomerFormBtn();

        // //6) Verify alert message is displayed
        await expect(alertMessage(5000)).to.eventually.include('Customer added successfully');
    });

    it('Test Case #2', async () => {
        //1) Navigate to manager page
        await this.homePage.open('http://www.way2automation.com/angularjs-protractor/banking/#/login');
        await this.homePage.clickManagerBtnLogin();

        //2) Verify the add customer, open account and customers button
        await expect(this.managerPage.addCustomerBtnIsPresent()).to.eventually.be.true;
        await expect(this.managerPage.addOpenAccountBtnIsPresent()).to.eventually.be.true;
        await expect(this.managerPage.customersBtnIsPresent()).to.eventually.be.true;

       // 3) Navigate to Open account page via open account button
       await this.managerPage.clickOpenAccountBtn();

       // 4) Verify the customers, currency and process button are enabled 
       await expect(this.openAccountPage.isCustomerSelectionEnabled()).to.eventually.be.true;
       await expect(this.openAccountPage.isCurrencySelectionEnabled()).to.eventually.be.true;
       await expect(this.openAccountPage.isProcessBtnEnabled()).to.eventually.be.true;

       // 5) Select the first customer in the list
       await this.openAccountPage.selectCustomerByIndex(option.MIN);

       // 6) Select the last currency in the list
       await this.openAccountPage.selectCurrencyByIndex(option.MAX);

       // 7) Process the account
       await this.openAccountPage.clickProcessBtn();

       // 8) Verify alert message is displayed
       await expect(alertMessage(8000)).to.eventually.include('Account created successfully');
   });

   it('Test Case #3', async () => {
       //1) Navigate to manager page
       await this.homePage.open('http://www.way2automation.com/angularjs-protractor/banking/#/login');
       await this.homePage.clickManagerBtnLogin();

       //2) Verify the add customer, open account and customers button
       await expect(this.managerPage.addCustomerBtnIsPresent()).to.eventually.be.true;
       await expect(this.managerPage.addOpenAccountBtnIsPresent()).to.eventually.be.true;
       await expect(this.managerPage.customersBtnIsPresent()).to.eventually.be.true;

       // 3)  avigate to Customers page via customers button
       await this.managerPage.clickCustomersBtn();

       // 4) Search for 'Harry'
       await this.customersPage.searchForCustomer('Harry');

       // 5) Delete 'Harry' account
       await this.customersPage.deleteSearchResults();

       // 6) Verify 'Harry' not existing in the list
       await expect(this.customersPage.resultCount('Harry')).to.eventually.equal(0);
   });

  });
