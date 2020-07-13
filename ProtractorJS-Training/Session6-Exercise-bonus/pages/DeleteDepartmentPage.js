class DeleteDepartmentPage{
    constructor () {
        this.deleteBtn = element(by.css("input[value='Delete']"));
    }

    clickDeleteBtn = async () => {
        await this.deleteBtn.click();
    }
}

module.exports = DeleteDepartmentPage;