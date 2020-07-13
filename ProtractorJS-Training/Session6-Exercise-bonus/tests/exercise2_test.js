let EmployeeDTO = require('../dto/EmployeeDTO');
let HomePage = require('../pages/HomePage');
let EmployeesPage = require('../pages/EmployeesPage');
let CreateEmployeePage = require('../pages/CreateEmployeePage');
let DeleteEmployeePage = require('../pages/DeleteEmployeePage');
let option = require('../utilities/enums');

/**
 * End-to-end Test
 */
describe('Exercise 1: Functional Test - Department', () => {
    browser.waitForAngularEnabled(false);
    const url = 'http://magenicautomation.azurewebsites.net/';

    beforeEach( () => {
        this.employeeDTO = new EmployeeDTO('Clarissa','Ortiaga','123 Street', 'Arizona', 'Unknown', 'Quality Engineering');
        this.homePage = new HomePage();
        this.employeesPage = new EmployeesPage();
        this.createEmployeePage = new CreateEmployeePage();
        this.deleteEmployeePage = new DeleteEmployeePage();
    });

    it('Test Case #1', async () => {
        // 1) Navigate to employee page
        await this.homePage.open(url);
        await this.homePage.goToEmployeePage();
        
        // 2) Check if the employee to be added is in the list
        let deleted = (await this.employeesPage.searchEmployees(this.employeeDTO)).length;
        //     a) If YES, Delete the employee
        if(deleted){
            await this.employeesPage.deleteEmployee(this.employeeDTO);
            await this.deleteEmployeePage.clickDeleteBtn();
        }

        // 3) Create an employee with the following:
        await this.employeesPage.clickCreateNew();
        await this.createEmployeePage.enterFirstName(this.employeeDTO.firstname);
        await this.createEmployeePage.enterLastName(this.employeeDTO.lastname);
        await this.createEmployeePage.enterAddress(this.employeeDTO.address);;
        await this.createEmployeePage.enterCity(this.employeeDTO.city);

        //     a) Select Random State        
        await this.createEmployeePage.selectStateByIndex(option.RANDOM);
        
        //     b) Select Quality Engineering
        await this.createEmployeePage.selectDepartmentByText(this.employeeDTO.department);
        await this.createEmployeePage.clickCreateBtn();

        // 4) Verify the newly added employee in the list
        let match = (await this.employeesPage.searchEmployees(this.employeeDTO)).length;
        expect(match).toBeGreaterThan(0);

        // 5) Delete the newly added employee
        if(match){
            await this.employeesPage.deleteEmployee(this.employeeDTO);
            await this.deleteEmployeePage.clickDeleteBtn();
        }

    });
});