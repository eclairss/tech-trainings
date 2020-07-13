let HomePage = require('../pages/HomePage');
let DepartmentsPage = require('../pages/DepartmentsPage');
let CreateDepartmentPage = require('../pages/CreateDepartmentPage');
let DeleteDepartmentPage = require('../pages/DeleteDepartmentPage');

/**
 * End-to-end Test
 */
describe('Exercise 1: Functional Test - Department', () => {
    browser.waitForAngularEnabled(false);
    const url = 'http://magenicautomation.azurewebsites.net/';

    beforeEach( () => {
        //this.employeeDTO = new EmployeeDTO('Clarissa','Ortiaga','123 Street', 'Arizona', 'Unknown', 'Advanced QA Department');
        this.department = 'Area 51';
        this.homePage = new HomePage();
        this.departmentsPage = new DepartmentsPage();
        this.createDepartmentPage = new CreateDepartmentPage();
        this.deleteDepartmentPage = new DeleteDepartmentPage();
    });

    it('Test Case #1', async () => {
        // 1) Navigate to department page
        await this.homePage.open(url);
        await this.homePage.goToDepartmentsPage();
        
        // // 2) Navigate to create new department page
        await this.departmentsPage.clickCreateNew();

        // // 3) Create department
        await this.createDepartmentPage.enterDepartment(this.department);
        await this.createDepartmentPage.clickCreateBtn();

        // // 4) Verify the newly created department in the list
        await expect((await this.departmentsPage.searchDepartments(this.department)).length).toBeGreaterThan(0);

        // 5) Delete the created department
        let deleted = await this.departmentsPage.deleteDepartment(this.department);
        if(deleted) {
            await this.deleteDepartmentPage.clickDeleteBtn();
        }
    });
});