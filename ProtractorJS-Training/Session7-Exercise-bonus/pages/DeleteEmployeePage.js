class DeleteEmployeePage{
    constructor () {
        this.deleteBtn = element(by.css("input[value='Delete']"));
    }

    clickDeleteBtn = async () => {
        await this.deleteBtn.click();
    }
}

module.exports = DeleteEmployeePage;