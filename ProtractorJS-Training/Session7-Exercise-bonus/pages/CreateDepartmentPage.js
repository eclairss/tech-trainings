class CreateDepartmentPage {
    constructor () {
        this.departmentFld = $('#DepartmentName');
        this.createBtn = element(by.css("input[value='Create']"));
    }

    enterDepartment = async (department) => {
        await this.departmentFld.clear();
        await this.departmentFld.sendKeys(department);
    }

    clickCreateBtn = async () => {
        await this.createBtn.click();
    }
}

module.exports = CreateDepartmentPage;